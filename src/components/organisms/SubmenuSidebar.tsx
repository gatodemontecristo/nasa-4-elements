import React from "react";
import { Accordion, UnderlinedTitle } from "../molecules";
import { CloseSidebar } from "../atoms";
import { MENU_ELEMENTS } from "@/constants";
import { useSidebarStore } from "@/store";

export const SubmenuSidebar = () => {
  const { activeItem, setActiveItem, activeSubItem, handleSubItemClick } =
    useSidebarStore();
  if (!activeItem) return null;
  return (
    <div
      className="bg-nasa-white w-64 h-full rounded-md shadow-2xl transform transition-all duration-300 ease-in-out
                        animate-in slide-in-from-left-5 fade-in-0 overflow-scroll custom-scroll"
    >
      <div className="relative p-4 h-full">
        <UnderlinedTitle
          title={MENU_ELEMENTS.find((item) => item.id === activeItem.id)?.label}
          icon={MENU_ELEMENTS.find((item) => item.id === activeItem.id)?.icon}
          iconColor={activeItem.color}
          textColor="text-nasa-noir"
        />
        <Accordion
          activeItem={activeItem}
          allowMultiple={false}
          defaultOpen={["filters"]}
          handleSubItemClick={handleSubItemClick}
          activeSubItem={activeSubItem}
        />
        <CloseSidebar onClick={() => setActiveItem(null)} />
      </div>
    </div>
  );
};
