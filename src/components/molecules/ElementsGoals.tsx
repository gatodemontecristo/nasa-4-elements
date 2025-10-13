import React from 'react';
import { ElementsGoalsProps } from '../../constants';

export const ElementsGoals = ({ tile, description, label, styles }: ElementsGoalsProps) => {
  const { border, bgDot, text } = styles;
  return (
    <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
      <div className="mb-6 flex items-start justify-between">
        <h3 className="font-space-grotesk text-lg font-semibold text-white">{tile}</h3>
        <div className={`flex h-8 w-8 items-center justify-center rounded-none border ${border}`}>
          <div className={`h-2 w-2 rounded-full ${bgDot}`}></div>
        </div>
      </div>
      <p className="font-inter mb-4 text-sm leading-relaxed text-gray-400">{description}</p>
      <div className={`font-jetbrains text-xs tracking-wide ${text}`}>{label}</div>
    </div>
  );
};
