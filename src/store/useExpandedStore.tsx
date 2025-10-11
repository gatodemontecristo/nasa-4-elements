import { create } from 'zustand';

interface ExpandedStoreProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}
export const useExpandedStore = create<ExpandedStoreProps>(set => ({
  expanded: false,
  setExpanded: (value: boolean) => set({ expanded: value }),
}));
