import React from 'react';

interface LineSeparatorProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}
export const LineSeparator = ({ direction = 'horizontal', className }: LineSeparatorProps) => {
  return direction === 'horizontal' ? (
    <div className={`absolute right-0 left-0 h-px bg-gray-800 ${className || ''}`}></div>
  ) : (
    <div className={`mx-4 h-full w-px bg-gray-800 ${className || ''}`}></div>
  );
};
