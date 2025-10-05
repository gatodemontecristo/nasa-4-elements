import React from 'react';
import { SiNasa } from 'react-icons/si';

export const NasaLogo = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-500">
      <span className="text-3xl font-bold text-white">
        <SiNasa />
      </span>
    </div>
  );
};
