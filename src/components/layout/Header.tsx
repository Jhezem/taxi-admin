"use client";
import { LogoutButton } from "@/components/features/auth/LogoutButton";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <h1 className="text-xl font-semibold text-gray-900">Money Tracker</h1>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
