import Image from 'next/image';
import React from 'react';

export const PeruFlag = () => {
  return (
    <Image
      src="/members/peru.png"
      alt="Sedapal Development Analysis"
      width={100}
      height={100}
      className="h-auto w-[30px] rounded-lg object-cover"
      priority
    ></Image>
  );
};
