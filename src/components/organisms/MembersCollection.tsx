import React from 'react';
import { SectionDecorations, WatermarkTitle } from '../molecules';
import { LineSeparator } from '../atoms';
import { AVATAR_MEMBERS } from '../../constants';
import { MemberSection } from '../molecules/MemberSection';
import { nanoid } from 'nanoid';

export const MembersCollection = () => {
  return (
    <div className="text-nasa-white font-jetbrains relative flex h-screen flex-row items-center justify-center bg-black px-5">
      <SectionDecorations></SectionDecorations>
      <WatermarkTitle title="members"></WatermarkTitle>

      {AVATAR_MEMBERS.map(member => (
        <MemberSection key={nanoid()} {...member} />
      ))}

      <LineSeparator direction={'horizontal'} className="top-1/6"></LineSeparator>
      <LineSeparator direction={'horizontal'} className="bottom-1/6"></LineSeparator>
      {/* <LineSeparator direction={'vertical'}></LineSeparator>
      <LineSeparator direction={'vertical'}></LineSeparator>
      <LineSeparator direction={'vertical'}></LineSeparator>
      <LineSeparator direction={'vertical'}></LineSeparator> */}
    </div>
  );
};
