import React from 'react';
import { IoPlanet } from 'react-icons/io5';

interface NotFoundProps {
  extended?: boolean;
}
export const NotFound = ({ extended = false }: NotFoundProps) => {
  return (
    <>
      {extended ? (
        <div className="m-5 flex h-[80%] flex-col items-center justify-center gap-1 rounded-lg border-1 border-white/20">
          <IoPlanet className="text-nasa-white size-8" />
          <p className="text-nasa-white font-jetbrains text-lg">Data not found</p>
          <p className="text-nasa-greysoft font-jetbrains text-sm">Please try again</p>
        </div>
      ) : (
        <div className="flex h-24 flex-col items-center justify-center gap-1">
          <IoPlanet className="text-nasa-white size-5" />
          <p className="text-nasa-white font-jetbrains text-sm">Data not found</p>
        </div>
      )}
    </>
  );
};
