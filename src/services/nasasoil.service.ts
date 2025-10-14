// Interfaces para tipar la respuesta de la API
export interface SoilMoistureUnits {
  time: string;
  soil_moisture_0_to_7cm: string;
}

export interface SoilMoistureHourlyData {
  time: string[];
  soil_moisture_0_to_7cm: number[];
}

export interface SoilMoistureResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: SoilMoistureUnits;
  hourly: SoilMoistureHourlyData;
}

// Parámetros para la consulta
export interface SoilMoistureParams {
  latitude: number;
  longitude: number;
  start_date?: string;
  end_date?: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_NASA_SOIL_URL || 'https://archive-api.open-meteo.com/v1/archive';

export class NasaSoilService {
  /**
   * Get soil moisture data for specific coordinates
   */
  static async getSoilMoisture(params: SoilMoistureParams): Promise<SoilMoistureResponse> {
    const url = new URL(BASE_URL);

    // Add parameters to URL
    url.searchParams.append('latitude', params.latitude.toString());
    url.searchParams.append('longitude', params.longitude.toString());
    url.searchParams.append('hourly', 'soil_moisture_0_to_7cm');
    url.searchParams.append('start_date', params.start_date || '2024-01-01');
    url.searchParams.append('end_date', params.end_date || '2024-12-31');

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`Error fetching soil moisture data: ${response.status}`);
      }

      const data: SoilMoistureResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getSoilMoisture:', error);
      throw error;
    }
  }

  /**
   * Get latest soil moisture value
   */
  static getLatestSoilMoisture(data: SoilMoistureResponse): number | null {
    const values = data.hourly.soil_moisture_0_to_7cm;
    for (let i = values.length - 1; i >= 0; i--) {
      if (values[i] !== null && values[i] !== undefined) {
        return values[i];
      }
    }
    return null;
  }

  /**
   * Get average soil moisture
   */
  static getAverageSoilMoisture(data: SoilMoistureResponse): number {
    const values = data.hourly.soil_moisture_0_to_7cm.filter(
      val => val !== null && val !== undefined
    );
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Interpret soil moisture levels
   */
  static interpretSoilMoisture(moisture: number): {
    status: string;
    description: string;
    color: string;
  } {
    if (moisture > 0.4) {
      return {
        status: 'High Moisture',
        description: 'Saturated soil conditions',
        color: '#3B82F6', // blue
      };
    } else if (moisture > 0.2) {
      return {
        status: 'Moderate Moisture',
        description: 'Adequate soil moisture',
        color: '#10B981', // green
      };
    } else if (moisture > 0.1) {
      return {
        status: 'Low Moisture',
        description: 'Dry soil conditions',
        color: '#F59E0B', // amber
      };
    } else {
      return {
        status: 'Very Low Moisture',
        description: 'Extremely dry conditions',
        color: '#EF4444', // red
      };
    }
  }

  /**
   * Get complete soil analysis
   */
  static getCompleteAnalysis(data: SoilMoistureResponse) {
    const latest = this.getLatestSoilMoisture(data);
    const average = this.getAverageSoilMoisture(data);

    return {
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        elevation: data.elevation,
        timezone: data.timezone,
      },
      processing: {
        generationTime: data.generationtime_ms,
        utcOffset: data.utc_offset_seconds,
      },
      moisture: {
        latest: latest,
        average: average,
        interpretation: latest ? this.interpretSoilMoisture(latest) : null,
        unit: data.hourly_units.soil_moisture_0_to_7cm,
      },
      dataQuality: {
        totalReadings: data.hourly.time.length,
        validReadings: data.hourly.soil_moisture_0_to_7cm.filter(val => val !== null).length,
      },
    };
  }
}
