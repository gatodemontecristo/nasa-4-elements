import React from 'react';

interface SedapalStatsProps {
  value: string;
  label: string;
}
export const SedapalStats = ({ value, label }: SedapalStatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-orbitron font-bold text-blue-500">{value}</p>
      <p className="text-nasa-whitesoft font-inter text-xs">{label}</p>
    </div>
  );
};
