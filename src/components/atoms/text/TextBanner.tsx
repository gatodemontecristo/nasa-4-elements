import React from 'react';
import { elementsBannerProps } from '../../../types';

export const TextBanner = ({ element, subtitle, className }: elementsBannerProps) => {
  return (
    <div className={`space-y-2`}>
      <div className={`font-jetbrains text-2xl font-bold uppercase ${className}`}>{element}</div>
      <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">{subtitle}</div>
    </div>
  );
};
