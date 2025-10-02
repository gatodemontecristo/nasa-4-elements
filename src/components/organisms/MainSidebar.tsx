import React from "react";
import { SidebarFullButton } from "../molecules";
import { MenuItem } from "@/types/generalType";
import { useSidebarStore } from "@/store";
interface MainSidebarProps {
  className?: string;
  menuItems: MenuItem[];
}
export const MainSidebar = ({ className, menuItems }: MainSidebarProps) => {
  const { activeItem, hoveredItem, handleItemClick } = useSidebarStore();
  return (
    <div
      className={`bg-nasa-black w-16 h-full flex flex-col items-center py-4 shadow-2xl rounded-md mr-2 ${className}`}
    >
      <div className="flex flex-col space-y-3 w-full">
        {menuItems.map((item) => (
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
