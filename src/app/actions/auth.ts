"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {
      success: false,
      error: "Usuario y contraseña son requeridos",
    };
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return {
      success: false,
      error: "Usuario o contraseña incorrectos",
    };
  }

  try {
    // Crear JWT token
    const token = await new SignJWT({
      username,
      loginTime: Date.now(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    redirect("/");
  } catch (error) {
    console.error("Error al crear sesión:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("session-token");

  redirect("/login");
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session-token");

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    return payload;
  } catch (error) {
    cookieStore.delete("session-token");
    return null;
  }
}
