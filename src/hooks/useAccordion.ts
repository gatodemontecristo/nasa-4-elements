import { useState } from 'react';

interface UseAccordionProps {
  allowMultiple?: boolean;
  defaultOpen?: string[];
}
export const useAccordion = ({ allowMultiple = true, defaultOpen = [] }: UseAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  const isOpen = (itemId: string) => openItems.includes(itemId);

  return {
    openItems,
    toggleItem,
    isOpen,
  };
};
