import React from 'react';
import { TeamLogo } from '../atoms';
import { MAIN_SUBTITLE, MAIN_TITLE } from '../../constants';

export const MainTitle = () => {
  return (
    <div className="font-nasalization mb-6 flex flex-col items-center text-6xl font-light text-white lg:text-8xl">
      <div className="flex flex-row items-center">
        <span>{MAIN_TITLE}</span>
        <TeamLogo></TeamLogo>
      </div>
      <span className="font-orbitron font-extralight tracking-tight">{MAIN_SUBTITLE}</span>
    </div>
  );
};
