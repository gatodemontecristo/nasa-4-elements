// Interfaces para tipar la respuesta de la API
export interface AirQualityUnits {
  time: string;
  pm10: string;
  pm2_5: string;
  carbon_dioxide: string;
  nitrogen_dioxide: string;
  methane: string;
}

export interface AirQualityHourlyData {
  time: string[];
  pm10: (number | null)[];
  pm2_5: (number | null)[];
  carbon_dioxide: (number | null)[];
  nitrogen_dioxide: (number | null)[];
  methane: (number | null)[];
}

export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: AirQualityUnits;
  hourly: AirQualityHourlyData;
}

// Parámetros para la consulta
export interface AirQualityParams {
  latitude: number;
  longitude: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_NASA_AIR_URL;

export class NasaAirService {
  /**
   * Obtiene datos de calidad del aire para coordenadas específicas
   */
  static async getAirQuality(params: AirQualityParams): Promise<AirQualityResponse> {
    const url = new URL(BASE_URL);

    // Agregar parámetros a la URL
    url.searchParams.append('latitude', params.latitude.toString());
    url.searchParams.append('longitude', params.longitude.toString());
    url.searchParams.append('hourly', 'pm10,pm2_5,carbon_dioxide,nitrogen_dioxide,methane');

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Error fetching air quality data: ${response.status}`);
      }

      const data: AirQualityResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getAirQuality:', error);
      throw error;
    }
  }

  /**
   * Obtiene el último valor disponible para cada contaminante
   */
  static getLatestValues(data: AirQualityResponse) {
    const hourly = data.hourly;
    const result: Record<string, number | null> = {};

    // Buscar el último valor no nulo para cada contaminante
    ['pm10', 'pm2_5', 'carbon_dioxide', 'nitrogen_dioxide', 'methane'].forEach(pollutant => {
      const values = hourly[pollutant as keyof AirQualityHourlyData] as (number | null)[];
      for (let i = values.length - 1; i >= 0; i--) {
        if (values[i] !== null) {
          result[pollutant] = values[i];
          break;
        }
      }
    });

    return result;
  }

  /**
   * Calcula el promedio de valores para cada contaminante
   */
  static getAverageValues(data: AirQualityResponse) {
    const hourly = data.hourly;
    const result: Record<string, number> = {};

    ['pm10', 'pm2_5', 'carbon_dioxide', 'nitrogen_dioxide', 'methane'].forEach(pollutant => {
      const values = hourly[pollutant as keyof AirQualityHourlyData] as (number | null)[];
      const validValues = values.filter(val => val !== null) as number[];

      if (validValues.length > 0) {
        result[pollutant] = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
      } else {
        result[pollutant] = 0;
      }
    });

    return result;
  }
}
