import React from 'react';

interface WatermarkTitleProps {
  className?: string;
  title: string;
  opacity?: string;
}
export const WatermarkTitle = ({
  className,
  title,
  opacity = 'opacity-20',
}: WatermarkTitleProps) => {
  return (
    <div
      className={`font-nasalization absolute top-15 right-0 left-0 text-[200px] text-gray-100 uppercase ${opacity} ${className}`}
    >
      <p>{title}</p>
    </div>
  );
};
