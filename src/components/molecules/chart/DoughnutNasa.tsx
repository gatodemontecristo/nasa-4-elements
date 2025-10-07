import React from 'react';
import { GASEOUS_POLLUTANTS_COLORS, GASEOUS_POLLUTANTS_LABELS } from '../../../constants';
import { ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { tooltipDoughnutFormat } from '../../../utils';
import { Context } from 'chartjs-plugin-datalabels';

interface DoughnutNasaProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  height?: string;
}
export const DoughnutNasa = ({ data, height = 'h-48', label }: DoughnutNasaProps) => {
  const chartData = {
    labels: GASEOUS_POLLUTANTS_LABELS,
    datasets: [
      {
        label: label,
        data: data,
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
