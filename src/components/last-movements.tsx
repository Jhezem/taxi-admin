import { Fragment, use } from "react";
import { Card, CardContent } from "./ui/card";
import { getAllMovements } from "@/utils/api";
import NoMovements from "./no-movements";
import { Entry } from "@/types/formData";

export default function LastMovements() {
  const rawEntries = use<Entry[]>(getAllMovements());
  const entries = rawEntries.filter((entry) => entry.Monto);

  if (entries.length === 0) return <NoMovements />;

  return (
    <Fragment>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Movimientos recientes
        </h2>
        <div className="max-h-96 overflow-y-auto space-y-3">
          {entries
            .slice(-5)
            .reverse()
            .map((entry, i) => (
              <Card key={`entry${i + 1}`} className="border-0 shadow-sm">
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
                          {entry.Vehiculo || "N/A"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {entry.Conductor || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {entry.Descripcion}
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
                        {entry["Tipo de movimiento"] === "Ingreso" ? "+" : "-"}
                        C${entry.Monto.toFixed(2)}
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
      </div>
    </Fragment>
  );
}
