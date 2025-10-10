import React from 'react';
import { FaStreetView } from 'react-icons/fa6';

interface StreetviewButtonProps {
  onClick?: () => void;
}
export const StreetviewButton = ({ onClick }: StreetviewButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-nasa-black text-nasa-grey hover:bg-nasa-primary flex items-center gap-2 rounded-md p-2 shadow-lg transition-colors"
      title="Ver Street View de la ubicación actual"
    >
      <FaStreetView />
      <span className="text-xs">Street View</span>
    </button>
  );
};
