/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  useGeocodeMutation,
  useStreetViewAvailability,
  useStreetViewUrl,
} from "@/hooks/useGoogleMaps";

//! DELETE THIS FILE - ONLY FOR DEMO PURPOSES - useGoogleMaps.ts has the actual hooks
export function GoogleMapsApiExamples() {
  const [searchAddress, setSearchAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  // Mutation para geocodificación
  const geocodeMutation = useGeocodeMutation();

  // Query para verificar disponibilidad de Street View
  const streetViewAvailability = useStreetViewAvailability(
    coordinates.lat,
    coordinates.lng
  );

  // Hook para obtener URL de Street View
  const streetViewUrl = useStreetViewUrl(coordinates.lat, coordinates.lng, {
    size: "400x300",
    fov: 120,
  });

  const handleSearch = async () => {
    if (!searchAddress.trim()) return;

    try {
      const result = await geocodeMutation.mutateAsync(searchAddress);
      if (result.results.length > 0) {
        const location = result.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {
      console.error("Error en geocodificación:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Google Maps API con React Query - Ejemplos
      </h2>

      {/* Ejemplo de Geocodificación */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          1. Búsqueda de Direcciones (Geocoding)
        </h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            placeholder="Ingresa una dirección..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={geocodeMutation.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {geocodeMutation.isPending ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {geocodeMutation.error && (
          <p className="text-red-500 text-sm mb-2">
            Error: {geocodeMutation.error.message}
          </p>
        )}

        {coordinates.lat !== 0 && coordinates.lng !== 0 && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              📍 Coordenadas encontradas: {coordinates.lat.toFixed(6)},{" "}
              {coordinates.lng.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      {/* Ejemplo de Street View */}
      {coordinates.lat !== 0 && coordinates.lng !== 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            2. Street View
          </h3>

          {/* Estado de disponibilidad */}
          <div className="mb-3">
            {streetViewAvailability.isLoading && (
              <p className="text-blue-500 text-sm">
                🔄 Verificando disponibilidad de Street View...
              </p>
            )}

            {streetViewAvailability.data !== undefined && (
              <p
                className={`text-sm ${
                  streetViewAvailability.data
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {streetViewAvailability.data
                  ? "✅ Street View disponible"
                  : "⚠️ Street View no disponible en esta ubicación"}
              </p>
            )}

            {streetViewAvailability.error && (
              <p className="text-red-500 text-sm">
                ❌ Error verificando Street View:{" "}
                {streetViewAvailability.error.message}
              </p>
            )}
          </div>

          {/* Imagen de Street View */}
          {streetViewAvailability.data && (
            <div className="bg-gray-50 p-3 rounded-md">
              <img
                src={streetViewUrl}
                alt="Street View"
                className="w-full rounded-md shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                URL generada:{" "}
                <code className="bg-gray-200 px-1 rounded text-xs break-all">
                  {streetViewUrl}
                </code>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">
          💡 Beneficios de React Query:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <strong>Cache automático:</strong> Las consultas se almacenan en
            caché
          </li>
          <li>
            • <strong>Estados de carga:</strong> isLoading, error, data
            automáticamente
          </li>
          <li>
            • <strong>Refetch inteligente:</strong> Revalida datos cuando es
            necesario
          </li>
          <li>
            • <strong>Optimización:</strong> Evita llamadas duplicadas a la API
          </li>
          <li>
            • <strong>Background updates:</strong> Mantiene los datos frescos
          </li>
        </ul>
      </div>
    </div>
  );
}
