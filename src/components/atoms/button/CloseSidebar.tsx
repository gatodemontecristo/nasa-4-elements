import React from 'react';
import { IoClose } from 'react-icons/io5';

interface CloseSidebarProps {
  onClick?: () => void;
}
export const CloseSidebar = ({ onClick }: CloseSidebarProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 font-bold text-gray-300 transition-all duration-200 hover:scale-110 hover:bg-gray-600 hover:text-white"
    >
      <IoClose />
    </button>
  );
};
