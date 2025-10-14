import { useQuery } from '@tanstack/react-query';
import { NasaSoilService, SoilMoistureParams } from '@/services/nasasoil.service';
import { GC_TIME_TANSTACK, RETRY_TANSTACK, STALE_TIME_TANSTACK } from '../constants';

// Query keys for React Query
export const SOIL_QUERY_KEYS = {
  SOIL_MOISTURE: 'soil-moisture',
} as const;

/**
 * Hook to get soil moisture data
 */
export const useSoilMoisture = (params: SoilMoistureParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [SOIL_QUERY_KEYS.SOIL_MOISTURE, params.latitude, params.longitude],
    queryFn: () => NasaSoilService.getSoilMoisture(params),
    enabled: enabled && !!params.latitude && !!params.longitude,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
    retry: RETRY_TANSTACK,
  });
};

/**
 * Hook to get complete soil analysis
 */
export const useSoilAnalysis = (params: SoilMoistureParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useSoilMoisture(params, enabled);

  const analysis = data ? NasaSoilService.getCompleteAnalysis(data) : null;

  return {
    data: analysis,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};
