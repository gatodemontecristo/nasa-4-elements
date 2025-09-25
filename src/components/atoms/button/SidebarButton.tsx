import React from "react";

interface SidebarButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export const SidebarButton = ({
  icon,
  isActive,
  onClick,
  color,
}: SidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 mx-auto flex items-center justify-center rounded-lg
        transition-all duration-300 ease-in-out transform
        ${
          isActive
            ? `${color} text-white scale-110 shadow-sm`
            : "bg-nasa-secondary hover:bg-gray-700 text-gray-300 hover:text-white hover:scale-105"
        }
        hover:shadow-lg
      `}
    >
      {icon}
    </button>
  );
};
