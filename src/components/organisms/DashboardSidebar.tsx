import React from "react";

import { CloseSidebar } from "../atoms";
import { Accordion, UnderlinedTitle } from "../molecules";
import { InformationPanel } from "./InformationPanel";
import { MainSidebar } from "./MainSidebar";
import { MENU_ELEMENTS } from "@/constants";
import { useSidebarStore } from "@/store";

export const DashboardSidebar = () => {
  const {
    activeItem,
    setActiveItem,
    activeSubItem,
    showInfoPanel,
    handleSubItemClick,
    onCloseInformationPanel,
  } = useSidebarStore();

  return (
    <div className="absolute left-0 top-0 h-screen z-50 flex p-4 ">
      <MainSidebar
        className="bg-nasa-black w-16 "
        menuItems={MENU_ELEMENTS}
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
        <InformationPanel onClose={onCloseInformationPanel}></InformationPanel>
      )}
    </div>
  );
};
