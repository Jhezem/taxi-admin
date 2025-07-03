"use client";

import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EntryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    Fecha: string;
    Vehículo: string;
    Conductor: string;
    "Tipo de movimiento": "Ingreso" | "Gasto";
    Monto: number;
    Descripción: string;
  }) => Promise<void>;
}

export function EntryForm({ open, onClose, onSubmit }: EntryFormProps) {
  const [formData, setFormData] = useState({
    Fecha: new Date().toISOString().split("T")[0],
    Vehículo: "",
    Conductor: "",
    "Tipo de movimiento": "" as "Ingreso" | "Gasto" | "",
    Monto: "",
    Descripción: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData["Tipo de movimiento"] || !formData.Monto) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        "Tipo de movimiento": formData["Tipo de movimiento"] as
          | "Ingreso"
          | "Gasto",
        Monto: Number.parseFloat(formData.Monto),
      });

      // Reset form
      setFormData({
        Fecha: new Date().toISOString().split("T")[0],
        Vehículo: "",
        Conductor: "",
        "Tipo de movimiento": "",
        Monto: "",
        Descripción: "",
      });
    } catch (error) {
      console.error("Error al enviar entrada:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-t-xl md:rounded-xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-lg font-semibold">Nueva Entrada</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={formData.Fecha}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Fecha: e.target.value }))
                }
                required
              />
            </div>

            {/* Vehículo */}
            <div className="space-y-2">
              <Label htmlFor="vehiculo">Vehículo</Label>
              <Input
                id="vehiculo"
                placeholder="ej. Taxi #45"
                value={formData.Vehículo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Vehículo: e.target.value }))
                }
                required
              />
            </div>

            {/* Conductor */}
            <div className="space-y-2">
              <Label htmlFor="conductor">Conductor</Label>
              <Input
                id="conductor"
                placeholder="ej. Juan Pérez"
                value={formData.Conductor}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Conductor: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* Tipo de movimiento */}
            <div className="space-y-2">
              <Label>Tipo de movimiento</Label>
              <Select
                value={formData["Tipo de movimiento"]}
                onValueChange={(value: "Ingreso" | "Gasto") =>
                  setFormData((prev) => ({
                    ...prev,
                    "Tipo de movimiento": value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ingreso">Ingreso</SelectItem>
                  <SelectItem value="Gasto">Gasto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monto */}
            <div className="space-y-2">
              <Label htmlFor="monto">Monto</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.Monto}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Monto: e.target.value }))
                }
                required
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="ej. Compra de combustible"
                value={formData.Descripción}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Descripción: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-black hover:bg-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
