import React from 'react';
import { FeaturesSection, SectionDecorations, SummarySection, WatermarkTitle } from '../molecules';
import { LineSeparator, VideoIcon } from '../atoms';
import { elementsSectionProps } from '../../types';

export const ElementSection = (element: elementsSectionProps) => {
  return (
    <div className="text-nasa-white font-jetbrains relative flex h-screen flex-row items-center justify-center bg-black px-5">
      <SectionDecorations></SectionDecorations>
      <WatermarkTitle title={element.element}></WatermarkTitle>
      <LineSeparator direction={'horizontal'} className="top-1/6"></LineSeparator>
      <LineSeparator direction={'horizontal'} className="bottom-1/6"></LineSeparator>
      <LineSeparator direction={'vertical'}></LineSeparator>
      <SummarySection summary={element.summary}></SummarySection>
      <LineSeparator direction={'vertical'}></LineSeparator>
      <FeaturesSection {...element}></FeaturesSection>
      <LineSeparator direction={'vertical'}></LineSeparator>
      <VideoIcon srcVideo={element.video} element={element.element} className="w-2/5"></VideoIcon>
      <LineSeparator direction={'vertical'}></LineSeparator>
    </div>
  );
};
