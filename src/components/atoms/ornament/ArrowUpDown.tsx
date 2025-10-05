import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ArrowUpDownProps {
  isOpen: boolean;
}
export const ArrowUpDown = ({ isOpen }: ArrowUpDownProps) => {
  return (
    <span className="text-nasa-whitesoft ml-2 flex-shrink-0 transition-transform duration-200">
      {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
    </span>
  );
};
