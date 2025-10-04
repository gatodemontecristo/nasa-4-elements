import React from 'react';
import { SidebarButton, Tooltip } from '../atoms';
import { MenuItem } from '@/types/generalType';
import { useSidebarStore } from '@/store';

interface SidebarFullButtonProps {
  item: MenuItem;
  onClick: () => void;
  btnActive: boolean;
  tipActive: boolean;
}
export const SidebarFullButton = ({
  item,
  onClick,
  btnActive,
  tipActive,
}: SidebarFullButtonProps) => {
  const { setHoveredItem } = useSidebarStore();
  return (
    <div
      key={item.id}
      className="relative flex w-full items-center"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <SidebarButton icon={item.icon} isActive={btnActive} onClick={onClick} color={item.bg} />
      {tipActive && <Tooltip label={item.label} />}
    </div>
  );
};
