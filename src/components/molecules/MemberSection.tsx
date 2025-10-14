import React from 'react';
import { AvatarMembersProps } from '../../constants';
import Image from 'next/image';
import { PeruFlag, SocialButton } from '../atoms';
import { nanoid } from 'nanoid';

export const MemberSection = ({ name, role, avatar, social_networks }: AvatarMembersProps) => {
  return (
    <div className="z-10 mt-10 flex h-[50%] w-1/5 flex-col items-center justify-start">
      <Image
        src={avatar || '/members/avatar.png'}
        alt={name}
        width={200}
        height={200}
        className="mb-2 aspect-square w-2/3 rounded-full object-cover shadow-lg"
        priority
      ></Image>
      <div className="mt-2 flex flex-row items-center justify-center gap-2">
        <p className="text-nasa-white font-jetbrains text-center text-2xl">{name}</p>
        <PeruFlag></PeruFlag>
      </div>
      <p className="text-nasa-greysoft font-orbitron text-lg">{role}</p>
      <div className="mt-2 flex flex-row gap-2">
        {social_networks.map(network => (
          <SocialButton key={nanoid()} url={network.url} icon={network.icon} />
        ))}
      </div>
    </div>
  );
};
