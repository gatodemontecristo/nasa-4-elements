'use client';
import React from 'react';
import { useExpandedStore, useSidebarStore } from '../../../store';

interface ExpandedButtonProps {
  icon: React.ReactNode;
  color: string;
  text: string;
}

export const ExpandedButton = ({ icon, color, text }: ExpandedButtonProps) => {
  const { setExpanded, setExpandedItem } = useExpandedStore();

  const { activeSubItem } = useSidebarStore();

  const onExpanded = () => {
    setExpanded(true);
    setTimeout(() => {
      if (activeSubItem) setExpandedItem(activeSubItem);
    }, 1000);
  };

  return (
    <button
      onClick={() => onExpanded()}
      className={`font-orbitron mx-auto mt-2 flex w-3/4 transform items-center justify-center gap-2 rounded-lg py-1 transition-all duration-300 ease-in-out ${color} hover:bg-nasa-greysoft hover:text-nasa-grey scale-110 text-white shadow-sm hover:scale-105`}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};
