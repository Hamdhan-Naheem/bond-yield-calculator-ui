import type {
  BondCalculatorInput,
  BondYieldResponse,
} from "../types/bondTypes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function calculateBondYield(
  payload: BondCalculatorInput,
): Promise<BondYieldResponse> {
  const response = await fetch(`${API_BASE_URL}/bonds/yield`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate bond yield");
  }

  return (await response.json()) as BondYieldResponse;
}
