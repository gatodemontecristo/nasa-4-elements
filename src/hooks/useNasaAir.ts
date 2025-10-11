import { useQuery } from '@tanstack/react-query';
import { NasaAirService, AirQualityParams } from '@/services/nasaair.service';
import { GC_TIME_TANSTACK, RETRY_TANSTACK, STALE_TIME_TANSTACK } from '../constants';

// Query keys for React Query
export const QUERY_KEYS = {
  AIR_QUALITY: 'air-quality',
} as const;

/**
 * Hook to get air quality data
 */
export const useAirQuality = (params: AirQualityParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AIR_QUALITY, params.latitude, params.longitude],
    queryFn: () => NasaAirService.getAirQuality(params),
    enabled: enabled && !!params.latitude && !!params.longitude,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
    retry: RETRY_TANSTACK,
  });
};

/**
 * Hook to get the latest pollutant values
 */
export const useLatestAirValues = (params: AirQualityParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useAirQuality(params, enabled);

  const latestValues = data ? NasaAirService.getLatestValues(data) : null;

  return {
    data: latestValues,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook to get average pollutant values
 */
export const useAverageAirValues = (params: AirQualityParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useAirQuality(params, enabled);

  const averageValues = data ? NasaAirService.getAverageValues(data) : null;

  return {
    data: averageValues,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Combined hook that returns both latest values and averages
 */
export const useAirQualityAnalysis = (params: AirQualityParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useAirQuality(params, enabled);

  const analysis = data
    ? {
        latest: NasaAirService.getLatestValues(data),
        average: NasaAirService.getAverageValues(data),
        metadata: {
          latitude: data.latitude,
          longitude: data.longitude,
          elevation: data.elevation,
          timezone: data.timezone,
          generationTime: data.generationtime_ms,
        },
        units: data.hourly_units,
      }
    : null;

  return {
    data: analysis,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};
