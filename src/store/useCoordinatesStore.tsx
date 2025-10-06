import { create } from 'zustand';

interface CoordinatesStoreProps {
  position: { lat: number; lng: number };
  open: boolean;
  currentZoom: number;
  currentCenter: { lat: number; lng: number };
  streetViewOpen: boolean;
  selectedLocation: { lat: number; lng: number; name: string };
  setOpen: (value: boolean) => void;
  setCurrentZoom: (zoom: number) => void;
  setCurrentCenter: (center: { lat: number; lng: number }) => void;
  setStreetViewOpen: (value: boolean) => void;
  setSelectedLocation: (location: { lat: number; lng: number; name: string }) => void;
}

export const useCoordinatesStore = create<CoordinatesStoreProps>(set => ({
  position: { lat: -12.0201464, lng: -76.8175454 },
  open: false,
  currentZoom: 15,
  currentCenter: { lat: -12.0201464, lng: -76.8175454 },
  streetViewOpen: false,
  selectedLocation: {
    lat: 0,
    lng: 0,
    name: '',
  },
  setOpen: (value: boolean) => set({ open: value }),
  setCurrentZoom: (zoom: number) => set({ currentZoom: zoom }),
  setCurrentCenter: (center: { lat: number; lng: number }) => set({ currentCenter: center }),
  setStreetViewOpen: (value: boolean) => set({ streetViewOpen: value }),
  setSelectedLocation: (location: { lat: number; lng: number; name: string }) =>
    set({ selectedLocation: location }),
}));
