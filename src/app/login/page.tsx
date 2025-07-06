import { LoginForm } from "@/components/features/auth/LoginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token");

  if (sessionToken) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="text-center mb-6">
            <Image
              src="/icon-512x512.png"
              width={100}
              height={100}
              alt="Taxi Tracker logo"
              className="my-0 mx-auto"
            />
            <p className="text-gray-600 mt-2">Inicia sesión para continuar</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
