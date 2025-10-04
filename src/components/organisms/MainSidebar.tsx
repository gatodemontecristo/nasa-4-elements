import React from 'react';
import { SidebarFullButton } from '../molecules';
import { MenuItem } from '@/types/generalType';
import { useSidebarStore } from '@/store';
interface MainSidebarProps {
  className?: string;
  menuItems: MenuItem[];
}
export const MainSidebar = ({ className, menuItems }: MainSidebarProps) => {
  const { activeItem, hoveredItem, handleItemClick } = useSidebarStore();
  return (
    <div
      className={`bg-nasa-black mr-2 flex h-full w-16 flex-col items-center rounded-md py-4 shadow-2xl ${className}`}
    >
      <div className="flex w-full flex-col space-y-3">
        {menuItems.map(item => (
          <SidebarFullButton
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item.id)}
            btnActive={activeItem?.id === item.id}
            tipActive={hoveredItem === item.id && !activeItem}
          ></SidebarFullButton>
        ))}
      </div>
    </div>
  );
};
