import { GLOBAL_ELEMENTS } from "@/constants";
import { MarkNasaItem } from "@/data";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AccordionHeader } from "../atoms";

interface AccordionProps {
  element: GLOBAL_ELEMENTS;
  marks: MarkNasaItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion2: React.FC<AccordionProps> = ({
  element,
  marks,
  allowMultiple = true,
  defaultOpen = [],
  className = "",
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
    <div className={`space-y-2 ${className}`}>
      {marks.map((mark) => (
        <div
          key={mark.id}
          className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden"
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
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen(mark.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-3 pt-0 text-gray-300 text-sm border-t border-gray-700/30"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
