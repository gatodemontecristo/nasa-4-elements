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
  static getRiskLevel(probabilidad: number): { level: string; color: string; description: string } {
    if (probabilidad >= 0.7) {
      return {
        level: 'Alto',
        color: '#EF4444', // red-500
        description: 'Alta probabilidad de desarrollo urbano',
      };
    } else if (probabilidad >= 0.4) {
      return {
        level: 'Medio',
        color: '#F59E0B', // amber-500
        description: 'Probabilidad moderada de desarrollo urbano',
      };
    } else {
      return {
        level: 'Bajo',
        color: '#10B981', // emerald-500
        description: 'Baja probabilidad de desarrollo urbano',
      };
    }
  }

  /**
   * Interpreta los valores de NDVI
   */
  static interpretNDVI(ndvi: number): { status: string; description: string } {
    if (ndvi > 0.5) {
      return {
        status: 'Vegetación densa',
        description: 'Área con alta cobertura vegetal',
      };
    } else if (ndvi > 0.2) {
      return {
        status: 'Vegetación moderada',
        description: 'Área con cobertura vegetal moderada',
      };
    } else {
      return {
        status: 'Poca vegetación',
        description: 'Área con poca o nula cobertura vegetal',
      };
    }
  }

  /**
   * Interpreta los valores de NTL (Night Time Light)
   */
  static interpretNTL(ntl: number): { status: string; description: string } {
    if (ntl > 0.5) {
      return {
        status: 'Alta actividad urbana',
        description: 'Zona con alta actividad nocturna',
      };
    } else if (ntl > 0.1) {
      return {
        status: 'Actividad urbana moderada',
        description: 'Zona con actividad nocturna moderada',
      };
    } else {
      return {
        status: 'Baja actividad urbana',
        description: 'Zona con poca actividad nocturna',
      };
    }
  }

  /**
   * Interpreta los valores de pendiente (slope)
   */
  static interpretSlope(slope: number): { status: string; description: string } {
    if (slope > 30) {
      return {
        status: 'Terreno muy inclinado',
        description: 'Difícil para desarrollo urbano',
      };
    } else if (slope > 15) {
      return {
        status: 'Terreno moderadamente inclinado',
        description: 'Requiere planificación especial',
      };
    } else {
      return {
        status: 'Terreno plano/suave',
        description: 'Favorable para desarrollo urbano',
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
