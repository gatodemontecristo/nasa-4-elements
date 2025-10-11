import { create } from 'zustand';
import { MarkNasa } from '../data';

interface ExpandedStoreProps {
  expanded: boolean;
  expandedItem: MarkNasa | null;
  setExpanded: (value: boolean) => void;
  setExpandedItem: (item: MarkNasa | null) => void;
}
export const useExpandedStore = create<ExpandedStoreProps>(set => ({
  expanded: false,
  expandedItem: null,
  setExpandedItem: (item: MarkNasa | null) => set({ expandedItem: item }),
  setExpanded: (value: boolean) => set({ expanded: value }),
}));
