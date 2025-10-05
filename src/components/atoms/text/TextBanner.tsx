import React from 'react';
import { elementsBannerProps } from '../../../types';

interface TextBannerProps extends elementsBannerProps {
  className?: string;
}
export const TextBanner = ({ element, subtitle, className }: TextBannerProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="font-jetbrains text-blue-40 uppercase0 text-2xl font-bold">{element}</div>
      <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">{subtitle}</div>
    </div>
  );
};
