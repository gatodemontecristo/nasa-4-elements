import React from 'react';
interface AnimateDotProps {
  active: boolean;
  className?: string;
  label?: string;
}
export const AnimateDot = ({ active, className, label }: AnimateDotProps) => {
  return (
    <div className="flex items-center">
      <span
        className={`mr-1 text-xs ${
          active ? 'text-nasa-whitesoft' : 'text-nasa-secondary opacity-60'
        }`}
      >
        {label}
      </span>
      <div
        className={`h-2 w-2 rounded-full ${
          active ? `${className} animate-pulse` : 'bg-nasa-greysoft'
        }`}
      ></div>
    </div>
  );
};
