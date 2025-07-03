export interface Entry {
  Fecha: string;
  Vehiculo: string;
  Conductor: string;
  "Tipo de movimiento": "Ingreso" | "Egreso" | "";
  Monto: number;
  Descripcion: string;
}
