import { useQuery } from '@tanstack/react-query';
import { NasaWaterService } from '@/services';
import { GC_TIME_TANSTACK, RETRY_TANSTACK, STALE_TIME_TANSTACK } from '../constants';

// Query keys for React Query
export const WATER_QUERY_KEYS = {
  MICROZONES_SUMMARY: 'microzones-summary',
} as const;

/**
 * Hook to get microzones summary data
 */
export const useMicrozonesSummary = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [WATER_QUERY_KEYS.MICROZONES_SUMMARY],
    queryFn: () => NasaWaterService.getMicrozonesSummary(),
    enabled,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
    retry: RETRY_TANSTACK,
  });
};

/**
 * Hook to get processed connection statistics
 */
export const useConnectionStats = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const connectionStats = data
    ? NasaWaterService.processConnectionStats(data.percentiles_conexiones)
    : null;

  return {
    data: connectionStats,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook to get coverage metrics
 */
export const useCoverageMetrics = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const coverageMetrics = data
    ? NasaWaterService.processCoverageMetrics(data.mediana_ratio, data.maximo_ratio)
    : null;

  return {
    data: coverageMetrics,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook to get system alerts
 */
export const useSystemAlerts = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const systemAlerts = data
    ? NasaWaterService.processSystemAlerts(data.advertencias_globales)
    : null;

  return {
    data: systemAlerts,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook to get risk level analysis
 */
export const useWaterRiskLevel = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const riskLevel = data
    ? NasaWaterService.getRiskLevel(
        NasaWaterService.processSystemAlerts(data.advertencias_globales)
      )
    : null;

  return {
    data: riskLevel,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Combined hook that returns complete water infrastructure analysis
 */
export const useWaterAnalysis = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [WATER_QUERY_KEYS.MICROZONES_SUMMARY, 'complete-analysis'],
    queryFn: () => NasaWaterService.getCompleteAnalysis(),
    enabled,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
    retry: RETRY_TANSTACK,
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
};

/**
 * Hook to get additional statistics
 */
export const useAdditionalWaterStats = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const additionalStats = data
    ? NasaWaterService.calculateAdditionalStats(
        NasaWaterService.processConnectionStats(data.percentiles_conexiones)
      )
    : null;

  return {
    data: additionalStats,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook that provides formatted data ready for UI display
 */
export const useFormattedWaterData = (enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useMicrozonesSummary(enabled);

  const formattedData = data
    ? {
        totalMicrozones: data.total_microzonas,
        connections: {
          percentile10: NasaWaterService.formatNumber(data.percentiles_conexiones.p10_conexiones),
          percentile25: NasaWaterService.formatNumber(data.percentiles_conexiones.p25_conexiones),
          median: NasaWaterService.formatNumber(data.percentiles_conexiones.mediana_conexiones),
          percentile75: NasaWaterService.formatNumber(data.percentiles_conexiones.p75_conexiones),
        },
        coverage: {
          average: `${(data.mediana_ratio * 100).toFixed(1)}%`,
          maximum: `${(data.maximo_ratio * 100).toFixed(1)}%`,
        },
        alerts: NasaWaterService.processSystemAlerts(data.advertencias_globales),
      }
    : null;

  return {
    data: formattedData,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};
