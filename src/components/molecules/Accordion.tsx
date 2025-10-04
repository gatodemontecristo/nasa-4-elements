import { formattedMark, MarkNasa } from '@/data';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AccordionHeader } from '../atoms';
import { GrLocationPin } from 'react-icons/gr';
import clsx from 'clsx';
import { MenuItem } from '@/types/generalType';

interface AccordionProps {
  activeItem: MenuItem;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  handleSubItemClick: (mark: MarkNasa) => void;
  activeSubItem: MarkNasa | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  activeItem,
  allowMultiple = true,
  defaultOpen = [],
  className = '',
  handleSubItemClick,
  activeSubItem,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  const isOpen = (itemId: string) => openItems.includes(itemId);
  const marks = formattedMark(activeItem.collection || []);

  return (
    <div className={`custom-scroll space-y-2 ${className}`}>
      {marks.map(mark => (
        <div
          key={mark.id}
          className={clsx(
            `accordion-scroll max-h-1/2 overflow-scroll rounded-lg border-2`,
            activeItem.border,
            activeItem.bg
          )}
        >
          <button
            onClick={() => toggleItem(mark.id)}
            className="focus:ring-opacity-50 flex w-full items-center justify-between p-3 text-left transition-colors duration-200 hover:bg-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <AccordionHeader element={activeItem.id} type={mark.type} />

            <span className="text-nasa-whitesoft ml-2 flex-shrink-0 transition-transform duration-200">
              {isOpen(mark.id) ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </span>
          </button>

          <div
            className={`bg-nasa-white accordion-scroll overflow-scroll transition-all duration-300 ease-in-out ${
              isOpen(mark.id) ? 'max-h-[400px] py-3 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-3 p-3 pt-0 text-sm text-gray-300">
              {mark.marks.map(subItem => (
                <button
                  key={subItem.key}
                  onClick={() => handleSubItemClick(subItem)}
                  className={`relative w-full transform rounded-lg p-3 text-left transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md ${
                    activeSubItem?.key === subItem.key
                      ? 'bg-nasa-black text-nasa-white ring-nasa-greysoft ring-opacity-50 shadow-lg ring-2'
                      : 'bg-nasa-whitesoft text-nasa-black hover:bg-gray-700 hover:text-white'
                  } `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="mb-1 text-sm font-medium">{subItem.name}</div>
                      {subItem.lat && (
                        <div className="text-xs opacity-75">
                          <span className="flex items-center gap-1">
                            <GrLocationPin /> <p>Lat: {subItem.lat.toFixed(4)}</p>
                          </span>
                          <span className="flex items-center gap-1">
                            <GrLocationPin /> <p>Lng: {subItem.lng.toFixed(4)}</p>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`mr-1 text-xs ${
                          activeSubItem?.key === subItem.key
                            ? 'text-nasa-whitesoft'
                            : 'text-nasa-secondary opacity-60'
                        }`}
                      >
                        Info
                      </span>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activeSubItem?.key === subItem.key
                            ? `${activeItem.bg} animate-pulse`
                            : 'bg-nasa-greysoft'
                        }`}
                      ></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
