import React from 'react';
import { GASEOUS_POLLUTANTS_COLORS, GASEOUS_POLLUTANTS_LABELS } from '../../../constants';
import { ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { tooltipDoughnutFormat } from '../../../utils';
import { Context } from 'chartjs-plugin-datalabels';
import { useAverageAirValues } from '../../../hooks';
import { LoadSpinner, NotFound } from '../../atoms';
import { MarkNasa } from '../../../data';

interface DoughnutNasaProps {
  label: string;
  height?: string;
  activeSubItem: MarkNasa;
}
export const DoughnutNasa = ({ height = 'h-48', label, activeSubItem }: DoughnutNasaProps) => {
  const { data, isLoading, isError } = useAverageAirValues(
    activeSubItem
      ? { latitude: activeSubItem.lat, longitude: activeSubItem.lng }
      : { latitude: 0, longitude: 0 },
    !!activeSubItem
  );
  if (isError) return <NotFound></NotFound>;
  if (isLoading || !data) return <LoadSpinner></LoadSpinner>;
  const chartData = {
    labels: GASEOUS_POLLUTANTS_LABELS,
    datasets: [
      {
        label: label,
        data: [
          data.pm10 || 0,
          data.pm2_5 || 0,
          (data.carbon_dioxide || 0) / 10,
          data.nitrogen_dioxide || 0,
          (data.methane || 0) / 100,
        ],
        backgroundColor: GASEOUS_POLLUTANTS_COLORS,
        borderColor: GASEOUS_POLLUTANTS_COLORS,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
    layout: {
      padding: {
        top: 10,
        bottom: 40, // <- espacio entre la gráfica y la parte inferior (leyenda)
      },
    },
  };
  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value: number, context: Context) => {
          const label =
            (context.chart.data.labels?.[context.dataIndex] as string | undefined) ?? '';
          return value.toFixed(2) + ' ' + label;
        },
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
          label: context => tooltipDoughnutFormat(context),
        },
      },
    },
    cutout: '60%',
  };
  return (
    <div className={`w-full ${height}`}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};
