"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStore } from "../store/form";
import { Plus } from "lucide-react";

const NoMovements = () => {
  const { openForm } = useFormStore();
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        C$
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No hay movimientos
      </h3>
      <p className="text-gray-500 mb-6">
        Comienza agregando tu primera entrada
      </p>
      <Button onClick={() => openForm()} className="bg-black hover:bg-gray-800">
        <Plus className="w-4 h-4 mr-2" />
        Agregar entrada
      </Button>
    </div>
  );
};

export default NoMovements;
