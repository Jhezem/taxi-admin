"use client";

import { useState, Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { format } from "date-fns";
import { getIncomeByDriver } from "@/utils/api";
import { Driver, DriverIncome } from "@/types/reports";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageSkeleton from "@/components/layout/PageSkeleton";

export default function DriversReportView() {
  const [data, setData] = useState<DriverIncome[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState<string>(format(new Date(), "yyyy-MM-01"));
  const [end, setEnd] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [driver, setDriver] = useState<Driver | "">("");

  const handleGenerateReport = () => {
    setLoading(true);
    getIncomeByDriver(start, end, driver)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reporte de Ingresos por Conductor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="relative w-full border rounded p-2 pr-10"
            />

            <Input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="relative w-full border rounded p-2 pr-10"
            />

            <Select
              value={driver}
              onValueChange={(value: Driver) => setDriver(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar conductor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Luis">Luis</SelectItem>
                <SelectItem value="Edwin">Edwin</SelectItem>
                <SelectItem value="David">David</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleGenerateReport}>Generar</Button>
          </div>
        </CardContent>
      </Card>

      {!loading && data.length > 0 && (
        <Fragment>
          <Card>
            <CardHeader>
              <CardTitle>Tabla de resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Conductor</th>
                    <th>Total Ingreso</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data.map((row, i) => (
                    <tr key={i}>
                      <td>{row.Conductor}</td>
                      <td>
                        C${" "}
                        {row.TotalIngreso.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Barras</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="Conductor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="TotalIngreso" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Fragment>
      )}
    </div>
  );
}
