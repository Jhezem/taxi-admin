"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-900"
      >
        <LogOut className="w-4 h-4 mr-1" />
        Salir
      </Button>
    </form>
  );
}
