import { useQuery } from '@tanstack/react-query';
import { NasaEarthService, NasaEarthParams } from '@/services/nasaearth.service';
import { GC_TIME_TANSTACK, RETRY_TANSTACK, STALE_TIME_TANSTACK } from '../constants';

// Query keys for React Query
export const EARTH_QUERY_KEYS = {
  PREDICTION: 'earth-prediction',
} as const;

/**
 * Hook to get urban development prediction
 */
export const useEarthPrediction = (params: NasaEarthParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [EARTH_QUERY_KEYS.PREDICTION, params.lat, params.lon],
    queryFn: () => NasaEarthService.getPrediction(params),
    enabled: enabled && !!params.lat && !!params.lon,
    staleTime: STALE_TIME_TANSTACK,
    gcTime: GC_TIME_TANSTACK,
    retry: RETRY_TANSTACK,
  });
};

/**
 * Hook to get complete prediction analysis
 */
export const useEarthAnalysis = (params: NasaEarthParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useEarthPrediction(params, enabled);

  const analysis = data ? NasaEarthService.getCompleteAnalysis(data) : null;

  return {
    data: analysis,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Hook to get only the risk level
 */
export const useRiskLevel = (params: NasaEarthParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useEarthPrediction(params, enabled);

  const riskLevel = data ? NasaEarthService.getRiskLevel(data.probabilidad) : null;

  return {
    data: riskLevel,
    isLoading,
    error,
    isError,
    probabilidad: data?.probabilidad,
    clase: data?.clase,
  };
};

/**
 * Hook to get environmental features interpretation
 */
export const useEnvironmentalFeatures = (params: NasaEarthParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useEarthPrediction(params, enabled);

  const features = data
    ? {
        ndvi: {
          value: data.features.ndvi,
          interpretation: NasaEarthService.interpretNDVI(data.features.ndvi),
        },
        ntl: {
          value: data.features.ntl,
          interpretation: NasaEarthService.interpretNTL(data.features.ntl),
        },
        slope: {
          value: data.features.slope,
          interpretation: NasaEarthService.interpretSlope(data.features.slope),
        },
      }
    : null;

  return {
    data: features,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};

/**
 * Combined hook that returns all available information
 */
export const useCompleteEarthData = (params: NasaEarthParams, enabled: boolean = true) => {
  const { data, isLoading, error, isError } = useEarthPrediction(params, enabled);

  const completeData = data
    ? {
        prediction: {
          probabilidad: data.probabilidad,
          clase: data.clase,
          riskLevel: NasaEarthService.getRiskLevel(data.probabilidad),
        },
        features: {
          ndvi: {
            value: data.features.ndvi,
            interpretation: NasaEarthService.interpretNDVI(data.features.ndvi),
          },
          ntl: {
            value: data.features.ntl,
            interpretation: NasaEarthService.interpretNTL(data.features.ntl),
          },
          slope: {
            value: data.features.slope,
            interpretation: NasaEarthService.interpretSlope(data.features.slope),
          },
        },
        coordinates: {
          lat: data.lat,
          lon: data.lon,
        },
      }
    : null;

  return {
    data: completeData,
    isLoading,
    error,
    isError,
    rawData: data,
  };
};
