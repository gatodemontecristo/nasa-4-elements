import React from 'react';

interface TooltipProps {
  label: string;
}
export const Tooltip = ({ label }: TooltipProps) => {
  return (
    <div className="animate-in slide-in-from-left-2 fade-in-0 absolute left-16 z-50 ml-2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg transition-all duration-200">
      {label}
      <div className="absolute top-1/2 left-0 -translate-x-1 -translate-y-1/2">
        <div className="h-2 w-2 rotate-45 bg-gray-900"></div>
      </div>
    </div>
  );
};
