import React from 'react';
import { MarkNasaItem } from '../../../data';
import { AccordionHeader } from '../detail';
import { ArrowUpDown } from '../ornament';
import { useSidebarStore } from '../../../store';

interface SectionButtonProps {
  onClick: () => void;
  mark: MarkNasaItem;
  isOpen: boolean;
}
export const SectionButton = ({ onClick, mark, isOpen }: SectionButtonProps) => {
  const { activeItem } = useSidebarStore();

  return (
    <button
      onClick={onClick}
      className="focus:ring-opacity-50 flex w-full items-center justify-between p-3 text-left transition-colors duration-200 hover:bg-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      <AccordionHeader element={activeItem?.id || 'wind'} type={mark.type} />
      <ArrowUpDown isOpen={isOpen} />
    </button>
  );
};
