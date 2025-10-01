import React from "react";
import { SidebarFullButton } from "../molecules";
import { MenuItem } from "@/types/generalType";
interface MainSidebarProps {
  className?: string;
  menuItems: MenuItem[];
  handleItemClick: (itemId: string) => void;
  activeItem?: MenuItem | null;
  hoveredItem: string | null;
  setHoveredItem: React.Dispatch<React.SetStateAction<string | null>>;
}
export const MainSidebar = ({
  className,
  menuItems,
  hoveredItem,
  setHoveredItem,
  activeItem,
  handleItemClick,
}: MainSidebarProps) => {
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
            setHoveredItem={setHoveredItem}
          ></SidebarFullButton>
        ))}
      </div>
    </div>
  );
};
