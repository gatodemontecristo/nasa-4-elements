import React from 'react';

import { MENU_ELEMENTS } from '@/constants';
import { useSidebarStore } from '@/store';
import { InformationSidebar, MainSidebar, SubmenuSidebar } from '../organisms';

export const DashboardSidebar = () => {
  const { activeItem, activeSubItem, showInfoPanel, onCloseInformationPanel } = useSidebarStore();

  return (
    <div className="absolute top-0 left-0 z-50 flex h-screen p-4">
      <MainSidebar className="bg-nasa-black w-16" menuItems={MENU_ELEMENTS}></MainSidebar>

      <SubmenuSidebar />

      {showInfoPanel && activeSubItem && activeItem && (
        <InformationSidebar onClose={onCloseInformationPanel}></InformationSidebar>
      )}
    </div>
  );
};
