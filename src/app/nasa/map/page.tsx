'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { GoGoal } from 'react-icons/go';
import { GrLocationPin } from 'react-icons/gr';
import { FaStreetView } from 'react-icons/fa';
import { DashboardSidebar, Markers, StreetViewModal, TextIcon, TextLoading } from '@/components';

import { usePrefetchStreetView, useReverseGeocode, useStreetView } from '@/hooks';
import { useCoordinatesStore, useSidebarStore } from '@/store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export default function Intro() {
  const {
    position,
    open,
    setOpen,
    currentZoom,
    setCurrentZoom,
    currentCenter,
    setCurrentCenter,
    streetViewOpen,
    setStreetViewOpen,
    selectedLocation,
    setSelectedLocation,
  } = useCoordinatesStore();

  // Hooks de React Query
  const streetViewData = useStreetView(selectedLocation.lat, selectedLocation.lng, {
    size: '800x400',
  });

  const addressData = useReverseGeocode(currentCenter.lat, currentCenter.lng);

  const { prefetchAvailability } = usePrefetchStreetView();

  // Función para abrir Street View
  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setStreetViewOpen(true);
    prefetchAvailability(lat, lng);
  };
  const { activeItem } = useSidebarStore();
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-screen w-full">
        <DashboardSidebar />

        {/* Controles de navegación personalizados */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-nasa-black rounded-md p-2 shadow-lg">
            <div className="text-nasa-grey space-y-1 text-xs">
              <TextIcon icon={<GoGoal />} text={`Zoom: ${currentZoom.toFixed(4)}`} />
              <TextIcon icon={<GrLocationPin />} text={`Lat: ${currentCenter.lat.toFixed(4)}`} />
              <TextIcon icon={<GrLocationPin />} text={`Lng: ${currentCenter.lng.toFixed(4)}`} />
              <TextLoading isShow={addressData.isFetching} label="🔄 Obtaining data..." />
            </div>
          </div>

          {/* Botón para Street View del centro actual */}
          <button
            onClick={() => openStreetView(currentCenter.lat, currentCenter.lng, 'Vista actual')}
            className="bg-nasa-black text-nasa-grey hover:bg-nasa-primary flex items-center gap-2 rounded-md p-2 shadow-lg transition-colors"
            title="Ver Street View de la ubicación actual"
          >
            <FaStreetView />
            <span className="text-xs">Street View</span>
          </button>
        </div>
        <Map
          colorScheme="DARK"
          zoom={currentZoom}
          center={currentCenter}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          streetViewControl={false}
          mapTypeControl={false}
          onCameraChanged={ev => {
            setCurrentZoom(ev.detail.zoom);
            setCurrentCenter(ev.detail.center);
          }}
        >
          <Markers points={activeItem} />

          <AdvancedMarker position={position}>
            <div className="relative">
              <img
                src="/naki_yoho.png" // 👈 desde /public
                alt="Marker"
                className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="h-0 w-0 border-t-[8px] border-r-[6px] border-l-[6px] border-t-white border-r-transparent border-l-transparent"></div>
              </div>
            </div>
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Im in Hamburg</p>
            </InfoWindow>
          )}
        </Map>

        {/* Modal de Street View */}
        {streetViewOpen && (
          <StreetViewModal
            isOpen={streetViewOpen}
            onClose={() => setStreetViewOpen(false)}
            location={selectedLocation}
            streetViewData={streetViewData}
          />
        )}
      </div>
    </APIProvider>
  );
}
