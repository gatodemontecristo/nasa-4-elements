import React from 'react';

interface SidebarButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export const SidebarButton = ({ icon, isActive, onClick, color }: SidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`mx-auto flex h-12 w-12 transform items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${
        isActive
          ? `${color} scale-110 text-white shadow-sm`
          : 'bg-nasa-white hover:bg-nasa-greysoft text-nasa-black hover:text-nasa-grey hover:scale-105'
      } hover:shadow-lg`}
    >
      {icon}
    </button>
  );
};
