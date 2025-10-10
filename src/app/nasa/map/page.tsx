'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { DashboardSidebar, Markers, NavegationControl, StreetViewModal } from '@/components';
import { useAirQualityAnalysis, usePrefetchStreetView, useStreetView } from '@/hooks';
import { useCoordinatesStore, useSidebarStore } from '@/store';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);
export default function Intro() {
  const {
    position,
    open,
    setOpen,
    currentZoom,
    setCurrentZoom,
    currentCenter,
    setCurrentCenter,
    streetViewOpen,
    setStreetViewOpen,
    selectedLocation,
    setSelectedLocation,
  } = useCoordinatesStore();

  // Hooks de React Query
  const streetViewData = useStreetView(selectedLocation.lat, selectedLocation.lng, {
    size: '800x400',
  });

  const { prefetchAvailability } = usePrefetchStreetView();

  // Función para abrir Street View
  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setStreetViewOpen(true);
    prefetchAvailability(lat, lng);
  };
  const { activeItem } = useSidebarStore();

  const { rawData } = useAirQualityAnalysis({
    latitude: -12.0464,
    longitude: -77.0428,
  });

  // Configuración del gráfico de línea estilo bolsa de valores con animación progresiva
  const createStockChart = () => {
    if (!rawData?.hourly) return null;

    const hourlyData = rawData.hourly;
    const timeLabels = hourlyData.time.slice(0, 24); // Últimas 24 horas
    const dataLength = timeLabels.length;

    // Configuración de animación progresiva
    const totalDuration = 8000;
    const delayBetweenPoints = totalDuration / dataLength;
    const previousY = (ctx: any) =>
      ctx.index === 0
        ? ctx.chart.scales.y.getPixelForValue(0)
        : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

    const animation = {
      x: {
        type: 'number' as const,
        easing: 'linear' as const,
        duration: delayBetweenPoints,
        from: NaN,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
      y: {
        type: 'number' as const,
        easing: 'linear' as const,
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
    };

    return {
      labels: timeLabels.map(time =>
        new Date(time).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      ),
      datasets: [
        {
          label: 'PM10',
          data: hourlyData.pm10.slice(0, 24),
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#EF4444',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
          animation,
        },
        {
          label: 'PM2.5',
          data: hourlyData.pm2_5.slice(0, 24),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#3B82F6',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
          animation,
        },
        {
          label: 'NO₂',
          data: hourlyData.nitrogen_dioxide.slice(0, 24),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#10B981',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
          animation,
        },
        {
          label: 'CO₂',
          data: hourlyData.carbon_dioxide.slice(0, 24),
          borderColor: '#F59E0B',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#F59E0B',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1',
          animation,
        },
      ],
    };
  };

  const stockChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 10,
            family: 'var(--font-jetbrains-mono)',
          },
          maxTicksLimit: 8,
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 10,
            family: 'var(--font-jetbrains-mono)',
          },
        },
        title: {
          display: true,
          text: 'μg/m³',
          color: '#9CA3AF',
          font: {
            size: 11,
            family: 'var(--font-inter)',
          },
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 10,
            family: 'var(--font-jetbrains-mono)',
          },
        },
        title: {
          display: true,
          text: 'ppm',
          color: '#9CA3AF',
          font: {
            size: 11,
            family: 'var(--font-inter)',
          },
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
            family: 'var(--font-nasalization)',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'line',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        titleFont: {
          family: 'var(--font-orbitron)',
          size: 12,
        },
        bodyFont: {
          family: 'var(--font-jetbrains-mono)',
          size: 11,
        },
        callbacks: {
          title: function (context) {
            return `⏰ ${context[0].label}`;
          },
          label: function (context) {
            const value = context.raw as number;
            const unit = context.datasetIndex === 3 ? 'ppm' : 'μg/m³';
            return `${context.dataset.label}: ${value?.toFixed(2) || 'N/A'} ${unit}`;
          },
        },
      },
    },
  };

  const chartData = createStockChart();

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="flex h-screen">
        <div className="relative h-full w-full">
          <DashboardSidebar />
          <NavegationControl
            onClick={() => openStreetView(currentCenter.lat, currentCenter.lng, 'Current view')}
          />
          <Map
            className="h-[50%] w-[60%]"
            colorScheme="DARK"
            zoom={currentZoom}
            center={currentCenter}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
            streetViewControl={false}
            mapTypeControl={false}
            onCameraChanged={ev => {
              setCurrentZoom(ev.detail.zoom);
              setCurrentCenter(ev.detail.center);
            }}
          >
            <Markers points={activeItem} />

            <AdvancedMarker position={position}>
              <div className="relative">
                <img
                  src="/naki_yoho.png" // 👈 desde /public
                  alt="Marker"
                  className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="h-0 w-0 border-t-[8px] border-r-[6px] border-l-[6px] border-t-white border-r-transparent border-l-transparent"></div>
                </div>
              </div>
            </AdvancedMarker>

            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p>Im in Hamburg</p>
              </InfoWindow>
            )}
          </Map>

          {/* Modal de Street View */}
          {streetViewOpen && (
            <StreetViewModal
              isOpen={streetViewOpen}
              onClose={() => setStreetViewOpen(false)}
              location={selectedLocation}
              streetViewData={streetViewData}
            />
          )}
        </div>

        {/* Gráfico estilo bolsa de valores */}
        <div className="w-1/2 bg-gray-900 p-6">
          <div className="mb-4">
            <h2 className="font-nasalization mb-1 text-2xl tracking-wider text-white">
              AIR QUALITY MARKET
            </h2>
            <p className="font-jetbrains text-sm text-gray-400">
              Real-time pollutant trading data • Last 24 hours
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                <span className="font-jetbrains text-green-400">LIVE FEED</span>
              </span>
              <span className="font-jetbrains text-gray-500">
                LAT: {currentCenter.lat.toFixed(4)}
              </span>
              <span className="font-jetbrains text-gray-500">
                LNG: {currentCenter.lng.toFixed(4)}
              </span>
            </div>
          </div>

          <div className="h-96 rounded-xl border border-gray-700 bg-black/60 p-6 backdrop-blur-sm">
            {chartData ? (
              <Line data={chartData} options={stockChartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <p className="font-jetbrains text-sm text-gray-400">Loading market data...</p>
                  <p className="font-jetbrains mt-1 text-xs text-gray-600">
                    Connecting to NASA satellites...
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg border border-gray-800 bg-black/40 p-4">
              <div className="font-jetbrains mb-2 text-gray-400">MARKET STATUS</div>
              <div className="font-nasalization text-sm tracking-wider text-green-400">ACTIVE</div>
            </div>
            <div className="rounded-lg border border-gray-800 bg-black/40 p-4">
              <div className="font-jetbrains mb-2 text-gray-400">DATA SOURCE</div>
              <div className="font-nasalization text-sm tracking-wider text-blue-400">NASA API</div>
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
