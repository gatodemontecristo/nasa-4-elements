import React from 'react';
import { Accordion, UnderlinedTitle } from '../molecules';
import { CloseSidebar } from '../atoms';
import { MENU_ELEMENTS } from '@/constants';
import { useSidebarStore } from '@/store';

export const SubmenuSidebar = () => {
  const { activeItem, setActiveItem, activeSubItem } = useSidebarStore();
  if (!activeItem) return null;
  return (
    <div className="bg-nasa-white animate-in slide-in-from-left-5 fade-in-0 custom-scroll h-full w-64 transform overflow-scroll rounded-md shadow-2xl transition-all duration-300 ease-in-out">
      <div className="relative h-full p-4">
        <UnderlinedTitle
          title={MENU_ELEMENTS.find(item => item.id === activeItem.id)?.label}
          icon={MENU_ELEMENTS.find(item => item.id === activeItem.id)?.icon}
          iconColor={activeItem.color}
          textColor="text-nasa-noir"
        />
        <Accordion
          activeItem={activeItem}
          allowMultiple={false}
          defaultOpen={['filters']}
          activeSubItem={activeSubItem}
        />
        <CloseSidebar onClick={() => setActiveItem(null)} />
      </div>
    </div>
  );
};
