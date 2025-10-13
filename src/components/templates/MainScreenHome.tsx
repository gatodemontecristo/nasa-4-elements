import React from 'react';
import { MainBanner, MainTitle } from '../organisms';
import { MainLink } from '../atoms';
import { MAIN_EXTRA } from '../../constants';

export const MainScreenHome = () => {
  return (
    <div className="mb-16 text-center">
      <div className="mb-6">
        <span className="font-jetbrains text-xs tracking-[0.3em] text-blue-400 uppercase">
          {MAIN_EXTRA}
        </span>
      </div>
      <MainTitle></MainTitle>
      <MainBanner></MainBanner>
      <MainLink href="/nasa/map" text="ACCESS THE DEMO" />
    </div>
  );
};
