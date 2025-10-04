import { FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

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
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="bg-nasa-secondary max-h-[90vh] max-w-4xl overflow-hidden rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-nasa-grey text-lg font-bold">Street View - {location.name}</h3>
          <button onClick={onClose} className="text-nasa-grey transition-colors hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Contenido de la imagen */}
          <div className="relative flex min-h-[400px] items-center justify-center rounded-lg bg-gray-800">
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <FaSpinner className="text-nasa-grey animate-spin text-2xl" />
                <p className="text-nasa-grey text-sm">Verificando disponibilidad...</p>
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
                <p className="text-sm">Street View no disponible en esta ubicación</p>
              </div>
            )}

            {!isLoading && !error && isAvailable && (
              <img
                src={url}
                alt={`Street View de ${location.name}`}
                className="max-w-full rounded-lg shadow-lg"
                onError={e => {
                  e.currentTarget.style.display = 'none';
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
              <p className={`mt-1 ${isAvailable ? 'text-green-400' : 'text-yellow-400'}`}>
                Estado: {isAvailable ? 'Street View disponible' : 'Street View no disponible'}
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
