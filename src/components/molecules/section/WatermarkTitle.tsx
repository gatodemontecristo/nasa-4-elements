import React from 'react';

interface WatermarkTitleProps {
  className?: string;
  title: string;
}
export const WatermarkTitle = ({ className, title }: WatermarkTitleProps) => {
  return (
    <div
      className={`font-nasalization absolute top-15 right-0 left-0 text-[200px] text-gray-100 opacity-20 uppercase${className}`}
    >
      <p>{title}</p>
    </div>
  );
};
