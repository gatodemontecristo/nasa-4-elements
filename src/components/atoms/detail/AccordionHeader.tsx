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
  const elementIcon = getElementIcon(element, type, "text-nasa-white");
  return (
    <div className="flex flex-row items-center ">
      {elementIcon.icon && (
        <span className="mr-3 text-nasa-white flex-shrink-0">
          {elementIcon.icon}
        </span>
      )}
      <div className="flex flex-col items-start">
        <span className="text-nasa-white font-medium text-sm">
          {elementIcon.title}
        </span>
        <span className="text-nasa-white font-medium text-xs">
          {elementIcon.subtitle}
        </span>
      </div>
    </div>
  );
};
