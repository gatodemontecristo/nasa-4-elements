import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
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
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full p-3 flex items-center justify-between text-left 
                       hover:bg-gray-700/50 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <div className="flex items-center">
              {item.icon && (
                <span className="mr-3 text-blue-400 flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <span className="text-white font-medium text-sm">
                {item.title}
              </span>
            </div>
            <span className="text-gray-400 ml-2 transition-transform duration-200 flex-shrink-0">
              {isOpen(item.id) ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-3 pt-0 text-gray-300 text-sm border-t border-gray-700/30">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
