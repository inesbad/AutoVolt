// types/vin.ts

export interface VinResult {
  Variable: string;
  VariableId: number;
  Value: string;
  ValueId: string | null;
}

export interface VinApiResponse {
  Results: VinResult[];
  SearchCriteria: string;
  Message: string;
  Count: number;
}

// Les champs clés que l'on veut afficher
export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  engine: string;
  fuelType: string;
  bodyClass: string;
  transmission: string;
  manufacturer: string;
  plantCountry: string;
}