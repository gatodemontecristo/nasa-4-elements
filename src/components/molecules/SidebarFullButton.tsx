import React from "react";
import { SidebarButton, Tooltip } from "../atoms";
import { MenuItem } from "@/types/generalType";

interface SidebarFullButtonProps {
  item: MenuItem;
  onClick: () => void;
  btnActive: boolean;
  tipActive: boolean;
  setHoveredItem: (value: React.SetStateAction<string | null>) => void;
}
export const SidebarFullButton = ({
  item,
  onClick,
  btnActive,
  tipActive,
  setHoveredItem,
}: SidebarFullButtonProps) => {
  return (
    <div
      key={item.id}
      className="relative flex items-center w-full"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <SidebarButton
        icon={item.icon}
        isActive={btnActive}
        onClick={onClick}
        color={item.bg}
      />
      {tipActive && <Tooltip label={item.label} />}
    </div>
  );
};
