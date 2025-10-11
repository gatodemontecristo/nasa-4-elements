import React from 'react';
import { CARD_COLOURS, cardColoursStyles } from '../../../constants';

interface CardInfoSectionProps {
  title: string;
  value: string | number;
  status: string;
  description: string;
  color: CARD_COLOURS;
}
export const CardInfoSection = ({
  title,
  value,
  status,
  description,
  color,
}: CardInfoSectionProps) => {
  const styles = cardColoursStyles[color];
  return (
    <div className={`rounded-lg border ${styles.formatShadow} p-3`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${styles.bg}`}></div>
          <h5 className={`font-jetbrains text-xs ${styles.title} uppercase`}>{title}</h5>
        </div>
        <span className="font-mono text-xs text-white">{value}</span>
      </div>
      <div className="space-y-1">
        <p className={`text-xs font-medium ${styles.subtitle}`}>{status}</p>
        <p className="text-xs text-gray-300">{description}</p>
      </div>
    </div>
  );
};
