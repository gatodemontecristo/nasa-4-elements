import React from 'react';
import { IoPlanet } from 'react-icons/io5';

export const NotFound = () => {
  return (
    <div className="flex h-24 flex-col items-center justify-center gap-1">
      <IoPlanet className="text-nasa-white size-5" />
      <p className="text-nasa-white font-jetbrains text-sm">Data not found</p>
    </div>
  );
};
