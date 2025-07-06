"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/app/actions/auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await loginAction(formData);

      if (!result.success) {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.log("Error while login in", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="border-red-200 bg-red-50 p-2 items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Ingresa tu usuario"
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            required
            disabled={isLoading}
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-800"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Iniciando sesión...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Iniciar Sesión
          </div>
        )}
      </Button>
    </form>
  );
}
