import React from 'react';
import { ELEMENTS_BANNER, ELEMENTS_MAIN_MSG } from '../../constants';
import { TextBanner } from '../atoms';
import { nanoid } from 'nanoid';

export const MainBanner = () => {
  return (
    <div className="mx-auto mb-12 max-w-3xl">
      <p className="font-inter mb-6 text-xl leading-relaxed text-gray-300">
        <ELEMENTS_MAIN_MSG></ELEMENTS_MAIN_MSG>
      </p>
      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
        {ELEMENTS_BANNER.map(item => (
          <TextBanner key={nanoid()} element={item.element} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};
