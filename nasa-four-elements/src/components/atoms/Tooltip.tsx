import React from "react";

interface TooltipProps {
  label: string;
}
export const Tooltip = ({ label }: TooltipProps) => {
  return (
    <div
      className="absolute left-16 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg
                             shadow-lg z-50 whitespace-nowrap transform transition-all duration-200
                             animate-in slide-in-from-left-2 fade-in-0"
    >
      {label}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1">
        <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
};
