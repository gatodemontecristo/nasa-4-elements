import { formattedMark, MarkNasa } from '@/data';
import React from 'react';
import { MenuItem } from '@/types/generalType';
import { useAccordion } from '../../hooks';
import { AccordionSection } from './AccordionSection';

interface AccordionProps {
  activeItem: MenuItem;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  activeSubItem: MarkNasa | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  activeItem,
  allowMultiple = true,
  defaultOpen = [],
  className = '',
}) => {
  const { isOpen, toggleItem } = useAccordion({ allowMultiple, defaultOpen });
  const marks = formattedMark(activeItem.collection || []);

  return (
    <div className={`custom-scroll space-y-2 ${className}`}>
      {marks.map(mark => (
        <AccordionSection
          key={mark.id}
          mark={mark}
          isOpen={isOpen(mark.id)}
          onClick={() => toggleItem(mark.id)}
        />
      ))}
    </div>
  );
};
