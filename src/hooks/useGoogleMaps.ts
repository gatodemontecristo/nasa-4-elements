import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { StreetViewOptions } from '@/types/google-maps';
import {
  checkStreetViewAvailability,
  geocodeAddress,
  getPlaceDetails,
  getStreetViewImageUrl,
  reverseGeocode,
} from '@/services';
import { GC_TIME_TANSTACK, STALE_TIME_TANSTACK } from '../constants';

// Hook to generate Street View URL (doesn't need query since it's synchronous)
export const useStreetViewUrl = (lat: number, lng: number, options?: StreetViewOptions) => {
  return getStreetViewImageUrl(lat, lng, options);
};

// Hook to verify Street View availability
export const useStreetViewAvailability = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['streetViewAvailability', lat, lng],
    queryFn: () => checkStreetViewAvailability(lat, lng),
    enabled: !!(lat && lng),
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
  });
};

// Hook for geocoding
export const useGeocode = (address: string) => {
  return useQuery({
    queryKey: ['geocode', address],
    queryFn: () => geocodeAddress(address),
    enabled: !!address && address.length > 3,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
  });
};

// Hook for reverse geocoding
export const useReverseGeocode = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['reverseGeocode', lat, lng],
    queryFn: () => reverseGeocode(lat, lng),
    enabled: !!(lat && lng),
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
  });
};

// Hook for place details
export const usePlaceDetails = (placeId: string) => {
  return useQuery({
    queryKey: ['placeDetails', placeId],
    queryFn: () => getPlaceDetails(placeId),
    enabled: !!placeId,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
  });
};

// Hook for geocoding mutation (useful for searches)
export const useGeocodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: geocodeAddress,
    onSuccess: (data, address) => {
      // Cache the result for future use
      queryClient.setQueryData(['geocode', address], data);
    },
  });
};

// Custom hook that combines Street View URL and availability
export const useStreetView = (lat: number, lng: number, options?: StreetViewOptions) => {
  const url = useStreetViewUrl(lat, lng, options);
  const availability = useStreetViewAvailability(lat, lng);

  return {
    url,
    isAvailable: availability.data,
    isLoading: availability.isLoading,
    error: availability.error,
  };
};

// Hook to preload Street View data
export const usePrefetchStreetView = () => {
  const queryClient = useQueryClient();

  const prefetchAvailability = (lat: number, lng: number) => {
    queryClient.prefetchQuery({
      queryKey: ['streetViewAvailability', lat, lng],
      queryFn: () => checkStreetViewAvailability(lat, lng),
      staleTime: STALE_TIME_TANSTACK,
      gcTime: GC_TIME_TANSTACK,
    });
  };

  const prefetchReverseGeocode = (lat: number, lng: number) => {
    queryClient.prefetchQuery({
      queryKey: ['reverseGeocode', lat, lng],
      queryFn: () => reverseGeocode(lat, lng),
      staleTime: STALE_TIME_TANSTACK,
      gcTime: GC_TIME_TANSTACK,
    });
  };

  return {
    prefetchAvailability,
    prefetchReverseGeocode,
  };
};
