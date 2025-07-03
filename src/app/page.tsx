"use client";

import { useState, useEffect } from "react";
import { Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntryForm } from "@/components/entry-form";

interface Entry {
  id: string;
  Fecha: string;
  Vehículo: string;
  Conductor: string;
  "Tipo de movimiento": "Ingreso" | "Gasto";
  Monto: number;
  Descripción: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [balance, setBalance] = useState(0);

  // Función postEntry como solicita el usuario
  const postEntry = async (entryData: Omit<Entry, "id">) => {
    const newEntry: Entry = {
      ...entryData,
      id: Date.now().toString(),
    };

    setEntries((prev) => [...prev, newEntry]);
    setShowForm(false);

    // Simular llamada a API
    console.log("Nueva entrada:", newEntry);
  };

  // Calcular balance total
  useEffect(() => {
    const total = entries.reduce((acc, entry) => {
      return entry["Tipo de movimiento"] === "Ingreso"
        ? acc + entry.Monto
        : acc - entry.Monto;
    }, 0);
    setBalance(total);
  }, [entries]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Money Tracker</h1>
          <Button
            onClick={() => setShowForm(true)}
            size="sm"
            className="bg-black hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-1" />
            Nueva entrada
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Balance Card */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Balance Total
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900">
              $
              {balance.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-sm text-gray-500 mt-1">Al día de hoy</p>
          </CardContent>
        </Card>

        {/* Recent Entries */}
        {entries.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Movimientos recientes
            </h2>
            {entries
              .slice(-5)
              .reverse()
              .map((entry) => (
                <Card key={entry.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              entry["Tipo de movimiento"] === "Ingreso"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="font-medium text-gray-900">
                            {entry.Vehículo}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {entry.Conductor}
                        </p>
                        <p className="text-xs text-gray-500">
                          {entry.Descripción}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            entry["Tipo de movimiento"] === "Ingreso"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {entry["Tipo de movimiento"] === "Ingreso"
                            ? "+"
                            : "-"}
                          ${entry.Monto.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(entry.Fecha).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {entries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay movimientos
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza agregando tu primera entrada
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-black hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar entrada
            </Button>
          </div>
        )}
      </main>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          onClick={() => setShowForm(true)}
          size="lg"
          className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Entry Form Modal */}
      <EntryForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={postEntry}
      />
    </div>
  );
}
