'use client';
import { useAverageAirValues, useStreetView } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { GrLocationPin } from 'react-icons/gr';
import { CloseSidebar, InfoSkeleton } from '../atoms';
import { getElementIcon } from '@/utils';
import { UnderlinedTitle } from '../molecules';
import { useSidebarStore } from '@/store';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export interface InformationSidebarProps {
  onClose?: () => void;
}
export const InformationSidebar = ({ onClose }: InformationSidebarProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();
  const streetViewData = useStreetView(activeSubItem?.lat || 0, activeSubItem?.lng || 0, {
    size: '800x400',
  });

  const { data: averageAirValues } = useAverageAirValues(
    activeSubItem
      ? { latitude: activeSubItem.lat, longitude: activeSubItem.lng }
      : { latitude: 0, longitude: 0 },
    !!activeSubItem
  );
  console.log('Average Air Values:', averageAirValues);

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
    <div className="bg-nasa-black animate-in slide-in-from-right-5 fade-in-0 ml-2 h-full w-80 transform overflow-hidden rounded-md shadow-2xl transition-all duration-500 ease-in-out">
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

                  {/* Air Quality Chart */}
                  <div className="rounded-lg bg-gray-900/50 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-white">Air Quality Analysis</h3>
                    <div className="h-48">
                      <Doughnut data={chartData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="text-nasa-grey text-sm">
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

                    <p className="text-nasa-grey mt-2 text-[10px]">
                      Street View images are provided by the Google Maps API
                    </p>
                  </div>
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
