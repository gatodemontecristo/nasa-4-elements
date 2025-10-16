import Image from 'next/image';
import React from 'react';

export const NasaImage = () => {
  return (
    <Image
      src="/nasa.png"
      alt="2025 NASA Space Apps Challenge - Team 4 Elementors"
      width={100}
      height={100}
      className="h-auto w-auto rounded-lg object-cover"
      priority
    ></Image>
  );
};
