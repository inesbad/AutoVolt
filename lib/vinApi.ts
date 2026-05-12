// lib/vinService.ts
import { VinResult, VinApiResponse } from "@/lib/vin";

const VIN_API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

export async function decodeVIN(vin: string): Promise<VinResult[]> {
  if (!vin || vin.length !== 17) {
    throw new Error("Le VIN doit contenir exactement 17 caractères.");
  }

  const response = await fetch(
    `${VIN_API_BASE}/DecodeVin/${vin}?format=json`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données.");
  }

  const data: VinApiResponse = await response.json();

  return data.Results.filter(
    (item) => item.Value && item.Value !== "Not Applicable"
  );
}


export function mapToVehicleInfo(results: VinResult[]) {
  const get = (label: string) =>
    results.find((r) => r.Variable === label)?.Value ?? "—";

  return {
    make: get("Make"),
    model: get("Model"),
    year: get("Model Year"),
    engine: get("Engine Model"),
    fuelType: get("Fuel Type - Primary"),
    bodyClass: get("Body Class"),
    transmission: get("Transmission Style"),
    manufacturer: get("Manufacturer Name"),
    plantCountry: get("Plant Country"),
  };
}