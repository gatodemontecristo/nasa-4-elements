import React from 'react';
import { LoaderDot } from './ornament';

interface LoadSpinnerChartProps {
  type: 'urban' | 'air' | 'sedapal' | 'general';
}
export const LoadSpinnerChart = ({ type }: LoadSpinnerChartProps) => {
  switch (type) {
    case 'general':
      return (
        <div className="flex h-[90%] flex-row flex-wrap items-center justify-center gap-5 rounded-lg border-1 border-white/20 p-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-1/4 w-1/3 animate-pulse rounded-lg bg-gray-700"></div>
          ))}
        </div>
      );
    case 'air':
      return (
        <div className="items- flex h-[90%] flex-col justify-center gap-5 p-3">
          <div className="flex flex-row items-center justify-between">
            <div className="h-[30px] w-[40%] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="h-[30px] w-[25%] animate-pulse rounded-lg bg-gray-700"></div>
          </div>
          <div className="flex h-[80%] flex-row flex-wrap items-center justify-center gap-5 rounded-lg border-1 border-white/20 p-4">
            <LoaderDot></LoaderDot>
          </div>
        </div>
      );
    case 'urban':
      return (
        <div className="flex h-full w-full flex-col items-center gap-3 p-3">
          <div className="flex h-[75%] w-full flex-row flex-wrap items-start justify-center gap-2 rounded-lg border-1 border-white/20 p-4">
            <div className="h-1/3 w-[40%] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="h-1/3 w-[40%] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="h-1/3 w-[40%] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="h-1/3 w-[40%] animate-pulse rounded-lg bg-gray-700"></div>
          </div>
          <div className="h-[25px] w-[70%] animate-pulse rounded-lg bg-gray-700"></div>
        </div>
      );
    default:
      return (
        <>
          <div className="flex h-[40%] flex-row items-center justify-center gap-5 p-4">
            <div className="h-[90px] w-[90px] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="flex w-[50%] flex-col gap-2">
              <div className="h-[15px] w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-[15px] w-[70%] animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-[15px] w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
          </div>
          <div className="flex h-[60%] flex-row flex-wrap items-start justify-center gap-2 rounded-lg border-1 border-white/20 p-4">
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <div className="h-[60px] w-[60px] animate-pulse rounded-full bg-gray-700"></div>
              <div className="h-[15px] w-[50%] animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="h-[30px] w-[80%] animate-pulse rounded-lg bg-gray-700"></div>
            <div className="h-[30px] w-[80%] animate-pulse rounded-lg bg-gray-700"></div>
          </div>
        </>
      );
  }
};
