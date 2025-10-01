import { formattedMark, MarkNasa } from "@/data";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AccordionHeader } from "../atoms";
import { GrLocationPin } from "react-icons/gr";
import clsx from "clsx";
import { MenuItem } from "@/types/generalType";

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
  className = "",
  handleSubItemClick,
  activeSubItem,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  const isOpen = (itemId: string) => openItems.includes(itemId);
  const marks = formattedMark(activeItem.collection || []);

  return (
    <div className={`space-y-2 custom-scroll ${className}`}>
      {marks.map((mark) => (
        <div
          key={mark.id}
          className={clsx(
            `rounded-lg overflow-scroll border-2 accordion-scroll max-h-1/2`,
            activeItem.border,
            activeItem.bg
          )}
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleItem(mark.id)}
            className="w-full p-3 flex items-center justify-between text-left 
                       hover:bg-gray-700/50 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <AccordionHeader element={activeItem.id} type={mark.type} />

            <span className="text-nasa-whitesoft ml-2 transition-transform duration-200 flex-shrink-0">
              {isOpen(mark.id) ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-scroll bg-nasa-white accordion-scroll transition-all duration-300 ease-in-out ${
              isOpen(mark.id)
                ? "max-h-[400px] opacity-100 py-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 p-3 pt-0 text-gray-300 text-sm">
              {mark.marks.map((subItem) => (
                <button
                  key={subItem.key}
                  onClick={() => handleSubItemClick(subItem)}
                  className={`
                      w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out
                      transform hover:scale-[1.02] hover:shadow-md relative
                      ${
                        activeSubItem?.key === subItem.key
                          ? "bg-nasa-black text-nasa-white shadow-lg ring-2 ring-nasa-greysoft ring-opacity-50"
                          : "bg-nasa-whitesoft hover:bg-gray-700 text-nasa-black hover:text-white"
                      }
                    `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm mb-1">
                        {subItem.name}
                      </div>
                      {subItem.lat && (
                        <div className="text-xs opacity-75">
                          <span className="flex items-center gap-1">
                            <GrLocationPin />{" "}
                            <p>Lat: {subItem.lat.toFixed(4)}</p>
                          </span>
                          <span className="flex items-center gap-1">
                            <GrLocationPin />{" "}
                            <p>Lng: {subItem.lng.toFixed(4)}</p>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-xs  mr-1 ${
                          activeSubItem?.key === subItem.key
                            ? "text-nasa-whitesoft"
                            : "text-nasa-secondary opacity-60"
                        }`}
                      >
                        Info
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeSubItem?.key === subItem.key
                            ? `${activeItem.bg} animate-pulse`
                            : "bg-nasa-greysoft"
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
