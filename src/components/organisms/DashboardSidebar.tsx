import React, { useState } from "react";

import { CloseSidebar } from "../atoms";
import { MarkNasa } from "@/data";
import { Accordion, UnderlinedTitle } from "../molecules";
import { InformationPanel } from "./InformationPanel";
import { MainSidebar } from "./MainSidebar";
import { MenuItem } from "@/types/generalType";
import { MENU_ELEMENTS } from "@/constants";

export interface DashboardSidebarProps {
  activeItem: MenuItem | null;
  setActiveItem: (item: MenuItem | null) => void;
}

export const DashboardSidebar = ({
  activeItem,
  setActiveItem,
}: DashboardSidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<MarkNasa | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  const handleItemClick = (itemId: string) => {
    setActiveItem(
      activeItem?.id === itemId
        ? null
        : MENU_ELEMENTS.find((item) => item.id === itemId) || null
    );
    setActiveSubItem(null);
    setShowInfoPanel(false);
  };

  const handleSubItemClick = (subItemId: MarkNasa) => {
    setActiveSubItem(subItemId);

    setShowInfoPanel(true);
  };

  const onCloseInformationPanel = () => {
    setShowInfoPanel(false);
    setActiveSubItem(null);
  };

  return (
    <div className="absolute left-0 top-0 h-screen z-50 flex p-4 ">
      <MainSidebar
        className="bg-nasa-black w-16 "
        menuItems={MENU_ELEMENTS}
        activeItem={activeItem}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        handleItemClick={handleItemClick}
      ></MainSidebar>

      {/* Submenu Sidebar */}
      {activeItem && (
        <div
          className="bg-nasa-white w-64 h-full rounded-md shadow-2xl transform transition-all duration-300 ease-in-out
                     animate-in slide-in-from-left-5 fade-in-0 overflow-scroll custom-scroll"
        >
          <div className="relative p-4 h-full">
            <UnderlinedTitle
              title={
                MENU_ELEMENTS.find((item) => item.id === activeItem.id)?.label
              }
              icon={
                MENU_ELEMENTS.find((item) => item.id === activeItem.id)?.icon
              }
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
      )}

      {/* Information Panel */}
      {showInfoPanel && activeSubItem && activeItem && (
        <InformationPanel
          activeSubItem={activeSubItem}
          activeItem={activeItem}
          onClose={onCloseInformationPanel}
        ></InformationPanel>
      )}
    </div>
  );
};
