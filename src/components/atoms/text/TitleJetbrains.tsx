import React from 'react';

interface TitleJetbrainsProps {
  title: string;
}
export const TitleJetbrains = ({ title }: TitleJetbrainsProps) => {
  return <p className="text-nasa-white font-jetbrains text-xs">{title}</p>;
};
