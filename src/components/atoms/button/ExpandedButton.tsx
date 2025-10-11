'use client';
import React from 'react';
import { useExpandedStore } from '../../../store';

interface ExpandedButtonProps {
  icon: React.ReactNode;
  color: string;
  text: string;
}

export const ExpandedButton = ({ icon, color, text }: ExpandedButtonProps) => {
  const { setExpanded } = useExpandedStore();

  return (
    <button
      onClick={() => setExpanded(true)}
      className={`font-orbitron mx-auto mt-2 flex w-3/4 transform items-center justify-center gap-2 rounded-lg py-1 transition-all duration-300 ease-in-out ${color} hover:bg-nasa-greysoft hover:text-nasa-grey scale-110 text-white shadow-sm hover:scale-105`}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};
