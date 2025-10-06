import { useQuery } from '@tanstack/react-query';
import { NasaEarthService, NasaEarthParams } from '@/services/nasaearth.service';

// Query keys para React Query
export const EARTH_QUERY_KEYS = {
  PREDICTION: 'earth-prediction',
} as const;

/**
 * Hook para obtener predicción de desarrollo urbano
 */
export const useEarthPrediction = (params: NasaEarthParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [EARTH_QUERY_KEYS.PREDICTION, params.lat, params.lon],
    queryFn: () => NasaEarthService.getPrediction(params),
    enabled: enabled && !!params.lat && !!params.lon,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook para obtener análisis completo de la predicción
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
 * Hook para obtener solo el nivel de riesgo
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
 * Hook para obtener interpretación de características ambientales
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
 * Hook combinado que devuelve toda la información disponible
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
