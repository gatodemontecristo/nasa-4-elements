import React from 'react';

import { MENU_ELEMENTS } from '@/constants';
import { useExpandedStore, useSidebarStore } from '@/store';
import { InformationSidebar, MainSidebar, SubmenuSidebar } from '../organisms';

export const DashboardSidebar = () => {
  const { activeItem, activeSubItem, showInfoPanel, onCloseInformationPanel } = useSidebarStore();
  const { expanded } = useExpandedStore();

  return (
    <div
      className={`absolute top-0 left-0 z-50 flex h-screen p-4 transition-transform duration-700 ease-in-out ${
        !expanded ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <MainSidebar className="bg-nasa-black w-16" menuItems={MENU_ELEMENTS}></MainSidebar>

      <SubmenuSidebar />

      {showInfoPanel && activeSubItem && activeItem && (
        <InformationSidebar onClose={onCloseInformationPanel}></InformationSidebar>
      )}
    </div>
  );
};
