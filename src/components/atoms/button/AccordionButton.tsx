import React from 'react';
import { TextIcon, TextSecondary } from '../text';
import { AnimateDot } from '../ornament';
import { GrLocationPin } from 'react-icons/gr';
import { useSidebarStore } from '../../../store';
import { MarkNasa } from '../../../data';

interface AccordionButtonProps {
  onClick: () => void;
  subItem: MarkNasa;
}
export const AccordionButton = ({ onClick, subItem }: AccordionButtonProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();

  return (
    <button
      onClick={onClick}
      className={`relative w-full transform rounded-lg p-3 text-left transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md ${
        activeSubItem?.key === subItem.key
          ? 'bg-nasa-black text-nasa-white ring-nasa-greysoft ring-opacity-50 shadow-lg ring-2'
          : 'bg-nasa-whitesoft text-nasa-black hover:bg-gray-700 hover:text-white'
      } `}
    >
      <div className="flex items-center justify-between">
        <div>
          <TextSecondary label={subItem.name} />
          {subItem.lat && (
            <div className="text-xs opacity-75">
              <TextIcon icon={<GrLocationPin />} text={`Lat: ${subItem.lat.toFixed(4)}`} />
              <TextIcon icon={<GrLocationPin />} text={`Lng: ${subItem.lng.toFixed(4)}`} />
            </div>
          )}
        </div>
        <AnimateDot
          active={activeSubItem?.key === subItem.key}
          className={activeItem?.bg}
          label="Info"
        />
      </div>
    </button>
  );
};
