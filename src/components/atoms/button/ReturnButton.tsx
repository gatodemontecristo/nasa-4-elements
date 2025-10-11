'use client';
import React from 'react';
import { useExpandedStore } from '../../../store';
import { GiHamburgerMenu } from 'react-icons/gi';

export const ReturnButton = () => {
  const { setExpanded, setExpandedItem } = useExpandedStore();

  const onExpanded = () => {
    setExpanded(false);
    setExpandedItem(null);
  };

  return (
    <button
      onClick={() => onExpanded()}
      className={`font-orbitron bg-nasa-black hover:bg-nasa-greysoft hover:text-nasa-grey mx-auto mt-2 flex scale-110 transform items-center justify-center gap-2 rounded-sm p-2 text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105`}
    >
      <GiHamburgerMenu className="size-4" />
    </button>
  );
};
