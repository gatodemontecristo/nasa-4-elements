import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { StreetViewOptions } from "@/types/google-maps";
import {
  checkStreetViewAvailability,
  geocodeAddress,
  getPlaceDetails,
  getStreetViewImageUrl,
  reverseGeocode,
} from "@/services";

// Hook para generar URL de Street View (no necesita query ya que es síncrono)
export const useStreetViewUrl = (
  lat: number,
  lng: number,
  options?: StreetViewOptions
) => {
  return getStreetViewImageUrl(lat, lng, options);
};

// Hook para verificar disponibilidad de Street View
export const useStreetViewAvailability = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ["streetViewAvailability", lat, lng],
    queryFn: () => checkStreetViewAvailability(lat, lng),
    enabled: !!(lat && lng),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para geocodificación
export const useGeocode = (address: string) => {
  return useQuery({
    queryKey: ["geocode", address],
    queryFn: () => geocodeAddress(address),
    enabled: !!address && address.length > 3,
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para geocodificación inversa
export const useReverseGeocode = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ["reverseGeocode", lat, lng],
    queryFn: () => reverseGeocode(lat, lng),
    enabled: !!(lat && lng),
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para detalles de lugar
export const usePlaceDetails = (placeId: string) => {
  return useQuery({
    queryKey: ["placeDetails", placeId],
    queryFn: () => getPlaceDetails(placeId),
    enabled: !!placeId,
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
};

// Hook para mutation de geocodificación (útil para búsquedas)
export const useGeocodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: geocodeAddress,
    onSuccess: (data, address) => {
      // Cache el resultado para futuros usos
      queryClient.setQueryData(["geocode", address], data);
    },
  });
};

// Hook personalizado que combina Street View URL y disponibilidad
export const useStreetView = (
  lat: number,
  lng: number,
  options?: StreetViewOptions
) => {
  const url = useStreetViewUrl(lat, lng, options);
  const availability = useStreetViewAvailability(lat, lng);

  return {
    url,
    isAvailable: availability.data,
    isLoading: availability.isLoading,
    error: availability.error,
  };
};

// Hook para precargar datos de Street View
export const usePrefetchStreetView = () => {
  const queryClient = useQueryClient();

  const prefetchAvailability = (lat: number, lng: number) => {
    queryClient.prefetchQuery({
      queryKey: ["streetViewAvailability", lat, lng],
      queryFn: () => checkStreetViewAvailability(lat, lng),
      staleTime: 10 * 60 * 1000,
    });
  };

  const prefetchReverseGeocode = (lat: number, lng: number) => {
    queryClient.prefetchQuery({
      queryKey: ["reverseGeocode", lat, lng],
      queryFn: () => reverseGeocode(lat, lng),
      staleTime: 15 * 60 * 1000,
    });
  };

  return {
    prefetchAvailability,
    prefetchReverseGeocode,
  };
};
