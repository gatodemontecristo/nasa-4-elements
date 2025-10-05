import React from 'react';
import { ButtonRepository, HeaderLabel, NasaLogo } from '../atoms';

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center space-x-3">{children}</div>;
};

export const HeaderSection = () => {
  return (
    <nav className="relative z-40 flex items-center justify-between p-8">
      <HeaderContainer>
        <NasaLogo />
        <HeaderLabel text="NASA.URBAN.OBSERVATORY" />
      </HeaderContainer>
      <HeaderContainer>
        <HeaderLabel text="GITHUB.REPOSITORY" />
        <ButtonRepository url="https://github.com/nakiviar/NASA-4-elements" />
      </HeaderContainer>
    </nav>
  );
};
