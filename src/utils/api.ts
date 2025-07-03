"use server";

import { Entry } from "../types/formData";

const SHEET_EP =
  "https://script.google.com/macros/s/AKfycbwgtBq7Hgprbhvz7Iz39HkTRxUXRGNHbHyr4-BzMya2qVO0U9zFXIYENj3hQ4CSFcgmXg/exec";

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
  fetch(`${SHEET_EP}?balance=true`)
    .then((res) => res.json())
    .catch(() => 0);

export const getAllMovements = async () =>
  fetch(`${SHEET_EP}`)
    .then((res) => res.json())
    .catch(() => []);
