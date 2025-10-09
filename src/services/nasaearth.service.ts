// Interfaces para tipar la respuesta de la API
export interface NasaEarthFeatures {
  ndvi: number;
  ntl: number;
  slope: number;
}

export interface NasaEarthPredictionResponse {
  lat: number;
  lon: number;
  probabilidad: number;
  clase: string;
  features: NasaEarthFeatures;
}

// Parámetros para la consulta
export interface NasaEarthParams {
  lat: number;
  lon: number;
}

const BASE_URL = 'https://predictic-aahh-api-production.up.railway.app/predict';

export class NasaEarthService {
  /**
   * Obtiene predicción de desarrollo urbano para coordenadas específicas
   */
  static async getPrediction(params: NasaEarthParams): Promise<NasaEarthPredictionResponse> {
    const url = new URL(BASE_URL);

    // Agregar parámetros a la URL
    url.searchParams.append('lat', params.lat.toString());
    url.searchParams.append('lon', params.lon.toString());

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Error fetching NASA Earth prediction: ${response.status}`);
      }

      const data: NasaEarthPredictionResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getPrediction:', error);
      throw error;
    }
  }

  /**
   * Clasifica el nivel de riesgo basado en la probabilidad
   */
  static getRiskLevel(probabilidad: number): {
    level: string;
    bg: string;
    color: string;
    description: string;
  } {
    if (probabilidad >= 0.7) {
      return {
        level: 'High',
        bg: 'bg-red-500',
        color: 'text-red-500',
        description: 'High probability of urban development',
      };
    } else if (probabilidad >= 0.4) {
      return {
        level: 'Medium',
        bg: 'bg-amber-500',
        color: 'text-amber-500',
        description: 'Moderate probability of urban development',
      };
    } else {
      return {
        level: 'Low',
        bg: 'bg-emerald-500',
        color: 'text-emerald-500',
        description: 'Low probability of urban development',
      };
    }
  }

  /**
   * Interpreta los valores de NDVI
   */
  static interpretNDVI(ndvi: number): { status: string; description: string } {
    if (ndvi > 0.5) {
      return {
        status: 'Dense vegetation',
        description: 'Area with high vegetation coverage',
      };
    } else if (ndvi > 0.2) {
      return {
        status: 'Moderate vegetation',
        description: 'Area with moderate vegetation coverage',
      };
    } else {
      return {
        status: 'Sparse vegetation',
        description: 'Area with little or no vegetation coverage',
      };
    }
  }

  /**
   * Interpreta los valores de NTL (Night Time Light)
   */
  static interpretNTL(ntl: number): { status: string; description: string } {
    if (ntl > 0.5) {
      return {
        status: 'High urban activity',
        description: 'Zone with high nighttime activity',
      };
    } else if (ntl > 0.1) {
      return {
        status: 'Moderate urban activity',
        description: 'Zone with moderate nighttime activity',
      };
    } else {
      return {
        status: 'Low urban activity',
        description: 'Zone with low nighttime activity',
      };
    }
  }

  /**
   * Interpreta los valores de pendiente (slope)
   */
  static interpretSlope(slope: number): { status: string; description: string } {
    if (slope > 30) {
      return {
        status: 'Very steep terrain',
        description: 'Difficult for urban development',
      };
    } else if (slope > 15) {
      return {
        status: 'Moderately steep terrain',
        description: 'Requires special planning',
      };
    } else {
      return {
        status: 'Flat/gentle terrain',
        description: 'Favorable for urban development',
      };
    }
  }

  /**
   * Obtiene un análisis completo de la predicción
   */
  static getCompleteAnalysis(data: NasaEarthPredictionResponse) {
    return {
      coordinates: {
        lat: data.lat,
        lon: data.lon,
      },
      prediction: {
        probabilidad: data.probabilidad,
        clase: data.clase,
        risk: this.getRiskLevel(data.probabilidad),
      },
      environmental: {
        ndvi: {
          value: data.features.ndvi,
          interpretation: this.interpretNDVI(data.features.ndvi),
        },
        ntl: {
          value: data.features.ntl,
          interpretation: this.interpretNTL(data.features.ntl),
        },
        slope: {
          value: data.features.slope,
          interpretation: this.interpretSlope(data.features.slope),
        },
      },
    };
  }
}
