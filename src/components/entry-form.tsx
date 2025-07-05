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
import { Entry } from "@/types/formData";
import { addEntryAction } from "@/utils/api";
import { useFormStore } from "@/store/form";
import { useRouter } from "next/navigation";
import Loader from "./ui/loader";
import { getLocalYYYYMMDD } from "@/utils";

export function EntryForm() {
  const [formData, setFormData] = useState<Entry>({
    Fecha: getLocalYYYYMMDD(),
    Vehiculo: "",
    Conductor: "",
    "Tipo de movimiento": "",
    Monto: 0,
    Descripcion: "",
  });
  const { isOpen, closeForm } = useFormStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData["Tipo de movimiento"] || !formData.Monto) {
      return;
    }

    setIsSubmitting(true);
    addEntryAction(formData)
      .then(() => {
        // Reset form
        setFormData({
          Fecha: new Date().toISOString().split("T")[0],
          Vehiculo: "",
          Conductor: "",
          "Tipo de movimiento": "Ingreso",
          Monto: 0,
          Descripcion: "",
        });
        closeForm();
        router.refresh();
      })
      .catch((error) => console.error("Error al enviar entrada:", error))
      .finally(() => setIsSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-t-xl md:rounded-xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-lg font-semibold">Nueva Entrada</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => closeForm()}
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

              <Select
                value={formData.Vehiculo}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    Vehiculo: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar vehículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EON Gris">EON Gris</SelectItem>
                  <SelectItem value="I10 Rojo">I10 Rojo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conductor */}
            <div className="space-y-2">
              <Label htmlFor="conductor">Conductor</Label>
              <Select
                value={formData.Conductor}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    Conductor: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar conductor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Luis">Luis</SelectItem>
                  <SelectItem value="Edwin">Edwin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de movimiento */}
            <div className="space-y-2">
              <Label>Tipo de movimiento</Label>
              <Select
                value={formData["Tipo de movimiento"]}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    "Tipo de movimiento": value as Entry["Tipo de movimiento"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ingreso">Ingreso</SelectItem>
                  <SelectItem value="Egreso">Egreso</SelectItem>
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
                  setFormData((prev) => ({
                    ...prev,
                    Monto: Number(e.target.value),
                  }))
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
                value={formData.Descripcion}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Descripcion: e.target.value,
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
                onClick={() => closeForm()}
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
      {isSubmitting && <Loader />}
    </div>
  );
}
