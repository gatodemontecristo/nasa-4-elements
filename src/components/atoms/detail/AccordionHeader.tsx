import { GLOBAL_ELEMENTS } from "@/constants";
import { getElementIcon } from "@/utils";
import React from "react";

export const AccordionHeader = ({
  element,
  type,
}: {
  element: GLOBAL_ELEMENTS;
  type: string;
}) => {
  const item = getElementIcon(element, type);
  return (
    <div className="flex flex-row items-center">
      {item.icon && (
        <span className="mr-3 text-blue-400 flex-shrink-0">{item.icon}</span>
      )}
      <div className="flex flex-col items-start">
        <span className="text-white font-medium text-sm">{item.title}</span>
        <span className="text-white font-medium text-xs">{item.subtitle}</span>
      </div>
    </div>
  );
};
