import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaFireAlt, FaWind } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { TbPlant } from "react-icons/tb";
import { SidebarButton, Tooltip } from "../atoms";
import {
  TypeMark,
  winds,
  formattedMark,
  MarkNasa,
  earths,
  waters,
  fires,
} from "@/data";
import { Accordion } from "../molecules";
import { InformationPanel } from "./InformationPanel";
import { GLOBAL_ELEMENTS } from "@/constants";

export interface MenuItem {
  id: GLOBAL_ELEMENTS;
  icon: React.ReactNode;
  label: string;
  color: string;
  border: string;
  collection?: TypeMark[];
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    icon: <FaHome />,
    color: "orange-500",
    border: "border-orange-500",
    label: "Home",
  },
  {
    id: "fire",
    icon: <FaFireAlt />,
    color: "red-500",
    border: "border-red-500",
    label: "Fire",
    collection: fires,
  },
  {
    id: "water",
    icon: <IoIosWater />,
    color: "blue-600",
    border: "border-blue-600",
    label: "Water",
    collection: waters,
  },
  {
    id: "wind",
    icon: <FaWind />,
    label: "Wind",
    color: "yellow-500",
    border: "border-yellow-500",
    collection: winds,
  },
  {
    id: "earth",
    icon: <TbPlant />,
    label: "Earth",
    color: "green-500",
    border: "border-green-500",
    collection: earths,
  },
];

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
        : menuItems.find((item) => item.id === itemId) || null
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
      {/* Main Sidebar */}
      <div className="bg-nasa-black w-16 h-full flex flex-col items-center py-4 shadow-2xl rounded-md mr-2">
        <div className="flex flex-col space-y-3 w-full">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center w-full"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <SidebarButton
                icon={item.icon}
                isActive={activeItem?.id === item.id}
                onClick={() => handleItemClick(item.id)}
                color={item.color}
              />

              {/* Tooltip on hover */}
              {hoveredItem === item.id && !activeItem && (
                <Tooltip label={item.label} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submenu Sidebar */}
      {activeItem && (
        <div
          className="bg-nasa-white w-64 h-full rounded-md shadow-2xl transform transition-all duration-300 ease-in-out
                     animate-in slide-in-from-left-5 fade-in-0 overflow-scroll custom-scroll"
        >
          <div className="relative p-4 h-full">
            <div className="mb-6">
              <h3 className="text-nasa-noir text-lg font-semibold flex items-center">
                <span className={`mr-3 text-${activeItem.color}`}>
                  {menuItems.find((item) => item.id === activeItem.id)?.icon}
                </span>
                {menuItems.find((item) => item.id === activeItem.id)?.label}
              </h3>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 rounded-full"></div>
            </div>
            <Accordion
              activeItem={activeItem}
              allowMultiple={false}
              defaultOpen={["filters"]}
              handleSubItemClick={handleSubItemClick}
              activeSubItem={activeSubItem}
            />

            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
                         bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                         rounded-full transition-all duration-200 hover:scale-110"
            >
              ✕
            </button>
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
