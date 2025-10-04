'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { GoGoal } from 'react-icons/go';
import { GrLocationPin } from 'react-icons/gr';
import { FaStreetView } from 'react-icons/fa';
import { DashboardSidebar, Markers, StreetViewModal } from '@/components';

import { usePrefetchStreetView, useReverseGeocode, useStreetView } from '@/hooks';
import { useSidebarStore } from '@/store';

export default function Intro() {
  //URL: https://www.google.com/maps/place/Comunidad+Urbana+Autogestionaria+de+Huayc%C3%A1n,+Ate+15483/@-12.029715,-76.8401525,14.38z/data=!4m6!3m5!1s0x9105b6300b679ae5:0x3dbad2cd0e12330!8m2!3d-12.0201464!4d-76.8175454!16s%2Fm%2F09v1g_0?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D
  // Coordenadas de Comunidad Urbana Autogestionaria de Huaycán, Ate, Lima, Perú
  const position = { lat: -12.0201464, lng: -76.8175454 };
  const [open, setOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(15);
  const [currentCenter, setCurrentCenter] = useState(position);
  const [streetViewOpen, setStreetViewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
    name: '',
  });

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
    // Precargar datos cuando se abre
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
              <span className="flex items-center gap-1">
                <GoGoal /> <p>Zoom: {currentZoom}</p>
              </span>
              <span className="flex items-center gap-1">
                <GrLocationPin /> <p>Lat: {currentCenter.lat.toFixed(4)}</p>
              </span>
              <span className="flex items-center gap-1">
                <GrLocationPin /> <p>Lng: {currentCenter.lng.toFixed(4)}</p>
              </span>
              {/* Mostrar dirección si está disponible */}
              {addressData.data?.results[0] && (
                <div className="border-nasa-grey/20 mt-1 border-t pt-1">
                  <p
                    className="text-nasa-grey/80 max-w-48 truncate text-xs"
                    title={addressData.data.results[0].formatted_address}
                  >
                    📍 {addressData.data.results[0].formatted_address}
                  </p>
                </div>
              )}
              {addressData.isLoading && (
                <div className="border-nasa-grey/20 mt-1 border-t pt-1">
                  <p className="text-nasa-grey text-xs">🔄 Obtaining data...</p>
                </div>
              )}
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
