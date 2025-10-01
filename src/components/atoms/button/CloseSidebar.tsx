import React from "react";
import { IoClose } from "react-icons/io5";

interface CloseSidebarProps {
  onClick?: () => void;
}
export const CloseSidebar = ({ onClick }: CloseSidebarProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
                         bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                         rounded-full transition-all duration-200 hover:scale-110 font-bold"
    >
      <IoClose />
    </button>
  );
};
