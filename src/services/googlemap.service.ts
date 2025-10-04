import { StreetViewOptions, GeocodeResult } from '@/types/google-maps';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Servicio para generar URL de Street View
export const getStreetViewImageUrl = (
  lat: number,
  lng: number,
  options: StreetViewOptions = {}
): string => {
  const { size = '600x400', fov = 90, heading = 0, pitch = 0, key = GOOGLE_MAPS_API_KEY } = options;

  return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${key}`;
};

// Servicio para verificar si Street View está disponible
export const checkStreetViewAvailability = async (lat: number, lng: number): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    return data.status === 'OK';
  } catch (error) {
    console.error('Error checking Street View availability:', error);
    return false;
  }
};

// Servicio para geocodificación (convertir dirección en coordenadas)
export const geocodeAddress = async (address: string): Promise<GeocodeResult> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Error en la geocodificación');
  }

  return response.json();
};

// Servicio para geocodificación inversa (convertir coordenadas en dirección)
export const reverseGeocode = async (lat: number, lng: number): Promise<GeocodeResult> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Error en la geocodificación inversa');
  }

  return response.json();
};

// Servicio para obtener detalles de un lugar por Place ID
export const getPlaceDetails = async (placeId: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Error obteniendo detalles del lugar');
  }

  return response.json();
};
