import { TooltipItem } from 'chart.js';

export const tooltipDoughnutFormat = (context: TooltipItem<'doughnut'>) => {
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
};
