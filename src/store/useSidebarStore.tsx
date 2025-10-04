import { create } from 'zustand';
import { MenuItem } from '../types/generalType';
import { MarkNasa } from '@/data';
import { MENU_ELEMENTS } from '@/constants';
interface SidebarStoreProps {
  activeItem: MenuItem | null;
  hoveredItem: string | null;
  activeSubItem: MarkNasa | null;
  showInfoPanel: boolean;
  setActiveItem: (item: MenuItem | null) => void;
  setHoveredItem: (item: string | null) => void;
  setActiveSubItem: (item: MarkNasa | null) => void;
  setShowInfoPanel: (value: boolean) => void;
  handleItemClick: (itemId: string) => void;
  handleSubItemClick: (subItemId: MarkNasa) => void;
  onCloseInformationPanel: () => void;
}

export const useSidebarStore = create<SidebarStoreProps>((set, get) => ({
  activeItem: null,
  hoveredItem: null,
  activeSubItem: null,
  showInfoPanel: false,
  setActiveItem: (item: MenuItem | null) => set({ activeItem: item }),
  setHoveredItem: (item: string | null) => set({ hoveredItem: item }),
  setActiveSubItem: (item: MarkNasa | null) => set({ activeSubItem: item }),
  setShowInfoPanel: (value: boolean) => set({ showInfoPanel: value }),
  handleItemClick: (itemId: string) => {
    const { activeItem } = get();
    set({
      activeItem:
        activeItem?.id === itemId ? null : MENU_ELEMENTS.find(item => item.id === itemId) || null,
      activeSubItem: null,
      showInfoPanel: false,
    });
  },
  handleSubItemClick: (subItemId: MarkNasa) => {
    set({ activeSubItem: subItemId, showInfoPanel: true });
  },
  onCloseInformationPanel: () => {
    set({ showInfoPanel: false, activeSubItem: null });
  },
}));
