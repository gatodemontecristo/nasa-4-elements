import React from 'react';
import { useAirQualityAnalysis } from '../../../hooks';
import { MarkNasa } from '../../../data';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { LoadSpinner, NotFound } from '../../atoms';

interface LineStockNasaProps {
  activeSubItem: MarkNasa;
}
export const LineStockNasa = ({ activeSubItem }: LineStockNasaProps) => {
  const { rawData, isLoading, isError } = useAirQualityAnalysis(
    activeSubItem
      ? { latitude: activeSubItem.lat, longitude: activeSubItem.lng }
      : { latitude: 0, longitude: 0 },
    !!activeSubItem
  );
  if (isLoading || !rawData) return <LoadSpinner></LoadSpinner>;
  if (isError) return <NotFound></NotFound>;
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
  const chartData = createStockChart();
  return (
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
          <span className="font-jetbrains text-gray-500">LAT: {activeSubItem.lat.toFixed(4)}</span>
          <span className="font-jetbrains text-gray-500">LNG: {activeSubItem.lng.toFixed(4)}</span>
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
    </div>
  );
};
