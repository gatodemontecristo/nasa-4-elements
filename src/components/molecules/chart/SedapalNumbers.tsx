import Image from 'next/image';
import React from 'react';
import { useFormattedWaterData } from '../../../hooks';
import { LoadSpinner, NotFound } from '../../atoms';

export const SedapalNumbers = () => {
  const { data, isLoading, isError } = useFormattedWaterData();
  console.log('data', data);
  if (isError) return <NotFound></NotFound>;
  if (isLoading || !data) return <LoadSpinner></LoadSpinner>;
  return (
    <div className="mt-2 flex items-center justify-center gap-3">
      <Image
        src="/sedapal.jpg"
        alt="Sedapal Development Analysis"
        width={200}
        height={200}
        className="h-auto w-1/3 rounded-lg object-cover shadow-lg"
        priority
      ></Image>
      <div className="flex flex-col items-center justify-center">
        <p className="text-nasa-white font-jetbrains text-xs">CONNECTION DISTRIBUTION</p>
        <div className="mt-2 grid grid-cols-2 items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center">
            <p className="font-orbitron font-bold text-blue-500">52,529</p>
            <p className="text-nasa-whitesoft font-inter text-xs">10th Percentile</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-orbitron font-bold text-blue-500">52,529</p>
            <p className="text-nasa-whitesoft font-inter text-xs">10th Percentile</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-orbitron font-bold text-blue-500">52,529</p>
            <p className="text-nasa-whitesoft font-inter text-xs">10th Percentile</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-orbitron font-bold text-blue-500">2,529</p>
            <p className="text-nasa-whitesoft font-inter text-xs">10th Percentile</p>
          </div>
        </div>
      </div>
    </div>
  );
};
