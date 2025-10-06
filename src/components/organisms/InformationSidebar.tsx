'use client';
import { useAverageAirValues, useCompleteEarthData, useStreetView } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { GrLocationPin } from 'react-icons/gr';
import { CloseSidebar, InfoSkeleton } from '../atoms';
import { getElementIcon } from '@/utils';
import { UnderlinedTitle } from '../molecules';
import { useSidebarStore } from '@/store';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export interface InformationSidebarProps {
  onClose?: () => void;
}
export const InformationSidebar = ({ onClose }: InformationSidebarProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();
  const streetViewData = useStreetView(activeSubItem?.lat || 0, activeSubItem?.lng || 0, {
    size: '800x400',
  });
  const { data: completeEarthData } = useCompleteEarthData(
    activeSubItem
      ? { lat: Number(activeSubItem.lat.toFixed(4)), lon: Number(activeSubItem.lng.toFixed(4)) }
      : { lat: 0, lon: 0 },
    !!activeSubItem
  );
  const { data: averageAirValues } = useAverageAirValues(
    activeSubItem
      ? { latitude: activeSubItem.lat, longitude: activeSubItem.lng }
      : { latitude: 0, longitude: 0 },
    !!activeSubItem
  );

  // Configuración del gráfico de dona
  const chartData = {
    labels: ['PM10', 'PM2.5', 'CO₂', 'NO₂', 'CH₄'],
    datasets: [
      {
        label: 'Air Quality Pollutants',
        data: averageAirValues
          ? [
              averageAirValues.pm10 || 0,
              averageAirValues.pm2_5 || 0,
              (averageAirValues.carbon_dioxide || 0) / 10, // Escalar CO₂ para visualización
              averageAirValues.nitrogen_dioxide || 0,
              (averageAirValues.methane || 0) / 100, // Escalar metano para visualización
            ]
          : [25, 15, 45, 20, 30], // Datos de ejemplo
        backgroundColor: [
          '#FF6384', // PM10 - Rojo
          '#36A2EB', // PM2.5 - Azul
          '#FFCE56', // CO₂ - Amarillo
          '#4BC0C0', // NO₂ - Verde azulado
          '#9966FF', // CH₄ - Púrpura
        ],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#fff', // color del texto
        formatter: (value: number) => value.toFixed(2), // qué mostrar (puede ser value o porcentaje)
        font: {
          size: 14,
        },
      },
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 11,
          },
          padding: 5,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#333333',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw as number;
            let unit = '';

            switch (label) {
              case 'PM10':
              case 'PM2.5':
              case 'NO₂':
                unit = ' μg/m³';
                break;
              case 'CO₂':
                unit = ' ppm';
                break;
              case 'CH₄':
                unit = ' μg/m³';
                break;
            }

            return `${label}: ${value.toFixed(2)}${unit}`;
          },
        },
      },
    },
    cutout: '60%',
  };

  if (!activeItem) return null;
  const { url, isAvailable, isLoading, error } = streetViewData;
  if (!activeSubItem) return null;
  const elementIcon = getElementIcon(activeItem.id, activeSubItem.type);
  return (
    <div className="bg-nasa-black animate-in slide-in-from-right-5 fade-in-0 ml-2 h-full w-100 transform overflow-hidden rounded-md shadow-2xl transition-all duration-500 ease-in-out">
      <div className="custom-scroll relative h-full overflow-y-auto p-6">
        {(() => {
          return (
            <>
              {/* Header */}
              <UnderlinedTitle
                title={activeSubItem.name}
                icon={elementIcon.icon}
                iconColor={activeItem.color}
                textColor="text-white"
                isFantasy={true}
              />
              {isLoading ? (
                <InfoSkeleton></InfoSkeleton>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Street View Image */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-gray-800">
                    {error && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable === false && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable && (
                      <Image
                        src={url}
                        alt={`Street View de ${activeSubItem.name}`}
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                        unoptimized={true}
                        onError={e => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <div className="text-nasa-grey px-2 text-[12px]">
                    <div className="flex flex-row">
                      <span className="flex items-center gap-1">
                        <GrLocationPin /> <p>Lat: {activeSubItem.lat.toFixed(4)}, </p>
                      </span>
                      <span className="flex items-center gap-1">
                        <GrLocationPin /> <p>Lng: {activeSubItem.lng.toFixed(4)}</p>
                      </span>
                    </div>
                    {isAvailable !== undefined && (
                      <p className={`mt-1 ${isAvailable ? 'text-green-500' : 'text-yellow-400'}`}>
                        State: {isAvailable ? 'Street View available' : 'Street View not available'}
                      </p>
                    )}
                    <p className="text-nasa-grey text-[10px]">
                      Street View images are provided by the Google Maps API
                    </p>
                  </div>

                  {/* Air Quality Chart */}
                  <div className="rounded-lg bg-gray-900/50 p-2">
                    <h3 className="mb-3 text-sm font-semibold text-white">Air Quality Analysis</h3>
                    <div className="h-48">
                      <Doughnut data={chartData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Earth Quality Analysis */}
                  <div className="rounded-lg bg-gray-900/50 p-4">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Urban Development Analysis
                    </h3>

                    {completeEarthData ? (
                      <div className="space-y-4">
                        {/* Prediction Card */}
                        <div
                          className="rounded-lg border-l-4 bg-black/40 p-3"
                          style={{ borderLeftColor: completeEarthData.prediction.riskLevel.color }}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-nasalization text-xs tracking-wide text-white uppercase">
                              Risk Assessment
                            </h4>
                            <span
                              className="font-jetbrains rounded-full px-2 py-1 text-xs text-white"
                              style={{
                                backgroundColor: completeEarthData.prediction.riskLevel.color,
                              }}
                            >
                              {completeEarthData.prediction.riskLevel.level}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-400">Probability:</span>
                              <span className="font-mono text-xs text-white">
                                {(completeEarthData.prediction.probabilidad * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-400">Classification:</span>
                              <span className="text-xs text-white capitalize">
                                {completeEarthData.prediction.clase}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-300">
                              {completeEarthData.prediction.riskLevel.description}
                            </p>
                          </div>
                        </div>

                        {/* Environmental Features Grid */}
                        <div className="grid grid-cols-1 gap-3">
                          {/* NDVI Card */}
                          <div className="rounded-lg border border-green-500/30 bg-green-900/20 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                <h5 className="font-jetbrains text-xs text-green-400 uppercase">
                                  NDVI
                                </h5>
                              </div>
                              <span className="font-mono text-xs text-white">
                                {completeEarthData.features.ndvi.value.toFixed(3)}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-green-200">
                                {completeEarthData.features.ndvi.interpretation.status}
                              </p>
                              <p className="text-xs text-gray-300">
                                {completeEarthData.features.ndvi.interpretation.description}
                              </p>
                            </div>
                          </div>

                          {/* NTL Card */}
                          <div className="rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                <h5 className="font-jetbrains text-xs text-yellow-400 uppercase">
                                  NTL
                                </h5>
                              </div>
                              <span className="font-mono text-xs text-white">
                                {completeEarthData.features.ntl.value.toFixed(3)}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-yellow-200">
                                {completeEarthData.features.ntl.interpretation.status}
                              </p>
                              <p className="text-xs text-gray-300">
                                {completeEarthData.features.ntl.interpretation.description}
                              </p>
                            </div>
                          </div>

                          {/* Slope Card */}
                          <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                                <h5 className="font-jetbrains text-xs text-blue-400 uppercase">
                                  SLOPE
                                </h5>
                              </div>
                              <span className="font-mono text-xs text-white">
                                {completeEarthData.features.slope.value.toFixed(1)}°
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-blue-200">
                                {completeEarthData.features.slope.interpretation.status}
                              </p>
                              <p className="text-xs text-gray-300">
                                {completeEarthData.features.slope.interpretation.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-4 border-t border-gray-700 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Coordinates:</span>
                            <span className="font-mono text-xs text-gray-300">
                              {completeEarthData.coordinates.lat.toFixed(4)},{' '}
                              {completeEarthData.coordinates.lon.toFixed(4)}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            Analysis based on satellite imagery and machine learning predictions
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center">
                        <div className="text-center">
                          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
                          <p className="text-xs text-gray-400">Loading earth analysis...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Info */}
                </div>
              )}
            </>
          );
        })()}

        <CloseSidebar onClick={onClose} />
      </div>
    </div>
  );
};
