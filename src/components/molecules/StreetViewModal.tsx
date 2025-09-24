/* eslint-disable @next/next/no-img-element */
import { FaTimes, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

interface StreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  streetViewData: {
    url: string;
    isAvailable: boolean | undefined;
    isLoading: boolean;
    error: Error | null;
  };
}

export function StreetViewModal({
  isOpen,
  onClose,
  location,
  streetViewData,
}: StreetViewModalProps) {
  if (!isOpen) return null;

  const { url, isAvailable, isLoading, error } = streetViewData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-nasa-secondary rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-nasa-grey font-bold text-lg">
            Street View - {location.name}
          </h3>
          <button
            onClick={onClose}
            className="text-nasa-grey hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Contenido de la imagen */}
          <div className="relative min-h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <FaSpinner className="animate-spin text-nasa-grey text-2xl" />
                <p className="text-nasa-grey text-sm">
                  Verificando disponibilidad...
                </p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center gap-2 text-red-400">
                <FaExclamationTriangle size={24} />
                <p className="text-sm">Error al cargar Street View</p>
              </div>
            )}

            {!isLoading && !error && isAvailable === false && (
              <div className="flex flex-col items-center gap-2 text-yellow-400">
                <FaExclamationTriangle size={24} />
                <p className="text-sm">
                  Street View no disponible en esta ubicación
                </p>
              </div>
            )}

            {!isLoading && !error && isAvailable && (
              <img
                src={url}
                alt={`Street View de ${location.name}`}
                className="rounded-lg shadow-lg max-w-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

          {/* Información adicional */}
          <div className="text-nasa-grey text-sm">
            <p>
              Coordenadas: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>

            {isAvailable !== undefined && (
              <p
                className={`mt-1 ${
                  isAvailable ? "text-green-400" : "text-yellow-400"
                }`}
              >
                Estado:{" "}
                {isAvailable
                  ? "Street View disponible"
                  : "Street View no disponible"}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-400">
              Las imágenes de Street View son proporcionadas por Google Maps API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
