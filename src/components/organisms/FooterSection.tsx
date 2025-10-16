import React from 'react';
import { LinkCollection, WatermarkTitle } from '../molecules';
import { nanoid } from 'nanoid';
import { LinkSection } from '../../types';
import { NasaImage } from '../atoms';

const FooterSectionRoot = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-nasa-blue relative mt-10 flex flex-col">
      <WatermarkTitle title="footer" opacity="opacity-10"></WatermarkTitle>
      {children}
    </div>
  );
};

const FooterHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between px-15 py-2">
      <div className="flex flex-row items-center">
        <div className="h-[80px] w-[80px]">
          <NasaImage></NasaImage>
        </div>
      </div>
      <p className="font-jetbrains">2025 NASA Space Apps Challenge - Team 4 Elementors</p>
    </div>
  );
};

const FooterLine = () => {
  return <div className="border-nasa-white border-opacity-25 border-[0.5px]"></div>;
};

const FooterLinks = ({ collection }: { collection: LinkSection[] }) => {
  return (
    <footer className="mt-5 mb-5 flex flex-row items-start justify-around px-10 py-10">
      {collection.map(section => (
        <LinkCollection key={nanoid()} collection={section.links} title={section.title} />
      ))}
    </footer>
  );
};

export const FooterSection = Object.assign(FooterSectionRoot, {
  Header: FooterHeader,
  Line: FooterLine,
  Links: FooterLinks,
});
