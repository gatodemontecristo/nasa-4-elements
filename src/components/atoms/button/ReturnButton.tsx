'use client';
import React from 'react';
import { useExpandedStore, useSidebarStore } from '../../../store';
import { MENU_ELEMENTS } from '../../../constants';
import { GiHamburgerMenu } from 'react-icons/gi';

export const ReturnButton = () => {
  const { setExpanded, setExpandedItem } = useExpandedStore();
  const { activeItem } = useSidebarStore();

  const onExpanded = () => {
    setExpanded(false);
    setExpandedItem(null);
  };

  return (
    <button
      onClick={() => onExpanded()}
      className={`font-orbitron ${activeItem?.bg || 'bg-nasa-black'} hover:bg-nasa-greysoft hover:text-nasa-grey mx-auto mt-2 flex scale-110 transform items-center justify-center gap-2 rounded-sm p-4 text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105`}
    >
      {MENU_ELEMENTS.find(item => item.id === activeItem?.id)?.icon || (
        <GiHamburgerMenu className="size-4" />
      )}
    </button>
  );
};
