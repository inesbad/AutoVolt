// app/recherche/page.tsx
"use client";

import { useState } from "react";
import { decodeVIN, mapToVehicleInfo } from "@/lib/vinApi";

export default function RecherchePage() {
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState<ReturnType<typeof mapToVehicleInfo> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await decodeVIN(vin);
      setVehicle(mapToVehicleInfo(results));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Marque", value: vehicle?.make },
    { label: "Modèle", value: vehicle?.model },
    { label: "Année", value: vehicle?.year },
    { label: "Moteur", value: vehicle?.engine },
    { label: "Carburant", value: vehicle?.fuelType },
    { label: "Carrosserie", value: vehicle?.bodyClass },
    { label: "Transmission", value: vehicle?.transmission },
    { label: "Fabricant", value: vehicle?.manufacturer },
    { label: "Pays de fabrication", value: vehicle?.plantCountry },
  ];

  return (
    <main>
      <div className="flex justify-center p-50 w-full scale-x-150 scale-y-125">
        <div className="bg-fuchsia-900 border-2px border-gray-700 rounded-2xl shadow-md p-6 w-full max-w-md">
          <div className="bg-gray-900 p-6 border border-fuchsia-500 rounded-xl shadow-md">

            <div className="mt-10 mb-10 flex items-center justify-center gap-2">
              <h1 className="text-center text-2xl/9 font-bold tracking-tight text-white">
                🔍 Recherche par VIN
              </h1>

              {/* Bouton ? avec tooltip */}
              <div className="relative group flex-shrink-0">
                <button className="flex items-center justify-center w-5 h-5 bg-blue-300 text-white text-xs transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-fuchsia-900">
                  ?
                </button>

                <div className="absolute left-7 top-1/2 -translate-y-1/2 w-72 bg-gray-800 border border-fuchsia-500 rounded-lg p-4 shadow-xl
                                invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <h3 className="text-fuchsia-400 font-semibold text-sm mb-3">ℹ️ Qu'est-ce que le VIN ?</h3>

                  <div className="bg-gray-900 rounded-md p-2 mb-3 font-mono text-center tracking-widest border border-gray-600 text-sm">
                    <span className="text-blue-400">VF1</span>
                    <span className="text-yellow-400">BG0</span>
                    <span className="text-green-400">H</span>
                    <span className="text-orange-400">5</span>
                    <span className="text-pink-400">12345678</span>
                  </div>

                  <ul className="text-xs space-y-1">
                    <li><span className="text-blue-400 font-semibold">VF1</span> <span className="text-gray-300">— Pays + Constructeur</span></li>
                    <li><span className="text-yellow-400 font-semibold">BG0</span> <span className="text-gray-300">— Modèle / caractéristiques</span></li>
                    <li><span className="text-green-400 font-semibold">H</span> <span className="text-gray-300">— Année de fabrication</span></li>
                    <li><span className="text-orange-400 font-semibold">5</span> <span className="text-gray-300">— Usine d'assemblage</span></li>
                    <li><span className="text-pink-400 font-semibold">12345678</span> <span className="text-gray-300">— Numéro de série unique</span></li>
                  </ul>

                  <p className="text-gray-500 text-xs mt-3 border-t border-gray-700 pt-2">
                    📍 Retrouvez-le sur votre carte grise ou sous le pare-brise
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-6 mb-5">
              <input
                type="text"
                value={vin}
                maxLength={17}
                placeholder="Ex: 1HGCM82633A123456"
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && vin.length === 17 && search()}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={search}
                disabled={loading || vin.length !== 17}
                className="bg-fuchsia-900 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
              >
                {loading ? "..." : "Rechercher"}
              </button>
            </div>

            {/* Compteur */}
            <p className="text-xs text-gray-400 mb-6 text-right">{vin.length}/17 caractères</p>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            {/* Résultats */}
            {vehicle && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4">
                  <p className="text-fuchsia-900 font-bold text-lg">{vehicle.make} {vehicle.model}</p>
                  <p className="text-white text-sm">{vehicle.year}</p>
                </div>
                <ul className="divide-y divide-gray-100">
                  {fields.slice(2).map(({ label, value }) => (
                    <li key={label} className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-black">{label}</span>
                      <span className="text-fuchsia-900 font-medium">{value ?? "—"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}