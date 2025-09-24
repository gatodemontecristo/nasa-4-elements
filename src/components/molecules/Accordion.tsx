import { GLOBAL_ELEMENTS } from "@/constants";
import { MarkNasa, MarkNasaItem } from "@/data";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AccordionHeader } from "../atoms";
import { GrLocationPin } from "react-icons/gr";

interface AccordionProps {
  element: GLOBAL_ELEMENTS;
  marks: MarkNasaItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  handleSubItemClick: (mark: MarkNasa) => void;
  activeSubItem: MarkNasa | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  element,
  marks,
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

  return (
    <div className={`space-y-2 custom-scroll ${className}`}>
      {marks.map((mark) => (
        <div
          key={mark.id}
          className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-scroll accordion-scroll max-h-1/2"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleItem(mark.id)}
            className="w-full p-3 flex items-center justify-between text-left 
                       hover:bg-gray-700/50 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <AccordionHeader element={element} type={mark.type} />

            <span className="text-gray-400 ml-2 transition-transform duration-200 flex-shrink-0">
              {isOpen(mark.id) ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-scroll accordion-scroll transition-all duration-300 ease-in-out ${
              isOpen(mark.id)
                ? "max-h-[400px] opacity-100 py-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 p-3 pt-0 text-gray-300 text-sm border-t border-gray-700/30">
              {mark.marks.map((subItem) => (
                <button
                  key={subItem.key}
                  onClick={() => handleSubItemClick(subItem)}
                  className={`
                      w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out
                      transform hover:scale-[1.02] hover:shadow-md relative
                      ${
                        activeSubItem?.key === subItem.key
                          ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-opacity-50"
                          : "bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white"
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
                      <span className="text-xs opacity-60 mr-1">Info</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeSubItem?.key === subItem.key
                            ? "bg-white animate-pulse"
                            : "bg-blue-400"
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
