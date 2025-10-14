import React from 'react';
import { IoPlanet } from 'react-icons/io5';

export const NotFoundChart = () => {
  return (
    <>
      <div className="mt-2 flex flex-row items-center justify-around">
        <h2 className="font-nasalization text-xl tracking-wider text-white">AIR QUALITY MARKET</h2>
        <p className="text-nasa-grey font-jetbrains">-no data found-</p>
      </div>

      <div className="m-5 flex h-[80%] flex-col items-center justify-center gap-1 rounded-lg border-1 border-white/20">
        <IoPlanet className="text-nasa-white size-8" />
        <p className="text-nasa-white font-jetbrains text-lg">Data not found</p>
        <p className="text-nasa-greysoft font-jetbrains text-sm">Please try again</p>
      </div>
    </>
  );
};
