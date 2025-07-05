"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/form";
import { Home, BarChart, Plus } from "lucide-react";

export default function MobileBottomNav() {
  const router = useRouter();
  const { openForm } = useFormStore();
  const [showReports, setShowReports] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t flex justify-around items-center safe-bottom md:hidden z-50">
        <Link href="/" className="flex flex-col items-center text-gray-600">
          <Home className="w-6 h-6" />
          <span className="text-xs">Inicio</span>
        </Link>

        <button
          onClick={() => setShowReports((prev) => !prev)}
          className="flex flex-col items-center text-gray-600 relative"
        >
          <BarChart className="w-6 h-6" />
          <span className="text-xs">Reportes</span>
        </button>

        <button
          onClick={() => openForm()}
          className="flex flex-col items-center text-gray-600"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">Agregar</span>
        </button>
      </nav>

      {/* Submenu de reportes */}
      {showReports && (
        <div className="fixed bottom-16 inset-x-0 bg-white border-t border-b shadow-md md:hidden z-40">
          <div className="flex">
            <button
              onClick={() => {
                setShowReports(false);
                router.push("/reports/driver");
              }}
              className="flex-1 py-3 text-center hover:bg-gray-100"
            >
              Por Conductor
            </button>
            <button
              onClick={() => {
                setShowReports(false);
                router.push("/reports/vehicle");
              }}
              className="flex-1 py-3 text-center hover:bg-gray-100"
            >
              Por Vehículo
            </button>
          </div>
        </div>
      )}

      {/* Safe area spacer para notch */}
      <div className="h-6 safe-bottom md:hidden" />
    </>
  );
}
