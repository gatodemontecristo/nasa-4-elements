import clsx from 'clsx';
import React from 'react';
import { AccordionButton, SectionButton } from '../atoms';
import { useSidebarStore } from '../../store';
import { MarkNasaItem } from '../../data';

interface AccordionSectionProps {
  mark: MarkNasaItem;
  isOpen: boolean;
  onClick: () => void;
}
export const AccordionSection = ({ mark, isOpen, onClick }: AccordionSectionProps) => {
  const { activeItem, handleSubItemClick } = useSidebarStore();

  return (
    <div
      className={clsx(
        `accordion-scroll max-h-1/2 overflow-scroll rounded-lg border-2`,
        activeItem?.border,
        activeItem?.bg
      )}
    >
      <SectionButton onClick={onClick} mark={mark} isOpen={isOpen} />
      <div
        className={`bg-nasa-white accordion-scroll overflow-scroll transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[400px] py-3 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-3 p-3 pt-0 text-sm text-gray-300">
          {mark.marks.map(subItem => (
            <AccordionButton
              key={subItem.key}
              onClick={() => handleSubItemClick(subItem)}
              subItem={subItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
