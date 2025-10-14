import { SERVICE_TIMEOUT } from '../constants';

// Interfaces para tipar la respuesta de la API
export interface ConnectionPercentiles {
  p10_conexiones: number;
  p25_conexiones: number;
  mediana_conexiones: number;
  p75_conexiones: number;
}

export interface MicrozonesSummaryResponse {
  total_microzonas: number;
  percentiles_conexiones: ConnectionPercentiles;
  mediana_ratio: number;
  maximo_ratio: number;
  advertencias_globales: string[];
}

// Interfaces para datos procesados
export interface ConnectionStats {
  percentile10: number;
  percentile25: number;
  median: number;
  percentile75: number;
}

export interface CoverageMetrics {
  averageCoverage: number;
  maximumCoverage: number;
  averagePercentage: string;
  maximumPercentage: string;
}

export interface SystemAlert {
  type: 'warning' | 'error' | 'info';
  message: string;
  originalMessage: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_NASA_WATER_URL;

export class NasaWaterService {
  /**
   * Obtiene el resumen de microzonas de agua
   */
  static async getMicrozonesSummary(): Promise<MicrozonesSummaryResponse> {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(SERVICE_TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`Error fetching microzones summary: ${response.status}`);
      }

      const data: MicrozonesSummaryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getMicrozonesSummary:', error);
      throw error;
    }
  }

  /**
   * Procesa las estadísticas de conexiones
   */
  static processConnectionStats(percentiles: ConnectionPercentiles): ConnectionStats {
    return {
      percentile10: Math.round(percentiles.p10_conexiones),
      percentile25: Math.round(percentiles.p25_conexiones),
      median: Math.round(percentiles.mediana_conexiones),
      percentile75: Math.round(percentiles.p75_conexiones),
    };
  }

  /**
   * Procesa las métricas de cobertura
   */
  static processCoverageMetrics(medianaRatio: number, maximoRatio: number): CoverageMetrics {
    return {
      averageCoverage: medianaRatio,
      maximumCoverage: maximoRatio,
      averagePercentage: `${(medianaRatio * 100).toFixed(1)}%`,
      maximumPercentage: `${(maximoRatio * 100).toFixed(1)}%`,
    };
  }

  /**
   * Traduce y procesa las advertencias del sistema
   */
  static processSystemAlerts(advertencias: string[]): SystemAlert[] {
    const translations: Record<string, string> = {
      'Todas las microzonas reportan longitud de red de agua igual a cero.':
        'All microzones report zero water network length.',
      'Todas las microzonas reportan longitud de red de desagüe igual a cero.':
        'All microzones report zero sewage network length.',
      'Solo se registran proyectos activos en una microzona o ninguna.':
        'Active projects registered in only one microzone or none.',
    };

    return advertencias.map(advertencia => ({
      type: 'warning' as const,
      message: translations[advertencia] || advertencia,
      originalMessage: advertencia,
    }));
  }

  /**
   * Obtiene el análisis completo de microzonas
   */
  static async getCompleteAnalysis() {
    const data = await this.getMicrozonesSummary();

    return {
      summary: {
        totalMicrozones: data.total_microzonas,
        analyzedText: `${data.total_microzonas} Microzones Analyzed`,
      },
      connections: this.processConnectionStats(data.percentiles_conexiones),
      coverage: this.processCoverageMetrics(data.mediana_ratio, data.maximo_ratio),
      alerts: this.processSystemAlerts(data.advertencias_globales),
      rawData: data,
    };
  }

  /**
   * Formatea números para mostrar con separadores de miles
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }

  /**
   * Determina el nivel de riesgo basado en las advertencias
   */
  static getRiskLevel(alerts: SystemAlert[]): {
    level: string;
    color: string;
    description: string;
  } {
    const alertCount = alerts.length;

    if (alertCount >= 3) {
      return {
        level: 'High Risk',
        color: '#EF4444', // red-500
        description: 'Multiple infrastructure data gaps detected',
      };
    } else if (alertCount >= 2) {
      return {
        level: 'Medium Risk',
        color: '#F59E0B', // amber-500
        description: 'Some infrastructure data limitations',
      };
    } else {
      return {
        level: 'Low Risk',
        color: '#10B981', // emerald-500
        description: 'Infrastructure data appears complete',
      };
    }
  }

  /**
   * Calcula estadísticas adicionales
   */
  static calculateAdditionalStats(connections: ConnectionStats) {
    const { percentile25, median, percentile75 } = connections;

    return {
      range: percentile75 - percentile25, // Rango intercuartílico
      variability: (((percentile75 - percentile25) / median) * 100).toFixed(1) + '%',
      distribution: median > (percentile25 + percentile75) / 2 ? 'Right-skewed' : 'Left-skewed',
    };
  }
}
