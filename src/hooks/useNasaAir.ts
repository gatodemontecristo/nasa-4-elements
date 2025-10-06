import { useQuery } from '@tanstack/react-query';
import { NasaAirService, AirQualityParams } from '@/services/nasaair.service';

// Query keys para React Query
export const QUERY_KEYS = {
  AIR_QUALITY: 'air-quality',
} as const;

/**
 * Hook para obtener datos de calidad del aire
 */
export const useAirQuality = (params: AirQualityParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AIR_QUALITY, params.latitude, params.longitude],
    queryFn: () => NasaAirService.getAirQuality(params),
    enabled: enabled && !!params.latitude && !!params.longitude,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook para obtener los últimos valores de contaminantes
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
 * Hook para obtener los valores promedio de contaminantes
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
 * Hook combinado que devuelve tanto los últimos valores como los promedios
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
