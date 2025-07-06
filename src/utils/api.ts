"use server";

import { Entry } from "@/types/formData";
import { DriverIncome, VehicleIncome } from "@/types/reports";

const SHEET_EP =
  "https://script.google.com/macros/s/AKfycbwawMhSRhwDfPm_GAc0cxtlTn5_vWbsD7TkDmnmJpNDcKWqjdATq-8SPGtADTpaBX3uVQ/exec";

export async function addEntryAction(entry: Entry) {
  const res = await fetch(SHEET_EP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(
      `Error al guardar la entrada: ${res.status} ${res.statusText}`
    );
  }
}

export const getTotalBalance = async (): Promise<{ balance: number }> =>
  fetch(`${SHEET_EP}?balance=true`, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch(() => 0);

export const getAllMovements = async () =>
  fetch(`${SHEET_EP}`, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch(() => []);

export const getIncomeByDriver = async (
  start: string,
  end: string,
  driver?: string
): Promise<DriverIncome[]> => {
  const url = new URL(SHEET_EP);
  url.searchParams.set("report", "drivers");
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  if (driver && driver !== "todos") url.searchParams.set("driver", driver);

  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) {
    console.error("Error fetching driver report", res.statusText);
    return [];
  }
  return res.json();
};

export const getIncomeByVehicle = async (
  start: string,
  end: string,
  vehicle?: string
): Promise<VehicleIncome[]> => {
  const url = new URL(SHEET_EP);
  url.searchParams.set("report", "vehicles");
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  if (vehicle && vehicle !== "todos") url.searchParams.set("vehicle", vehicle);

  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) {
    console.error("Error fetching vehicle report", res.statusText);
    return [];
  }
  return res.json();
};
