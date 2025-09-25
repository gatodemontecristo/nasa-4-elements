/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { GoGoal } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { FaStreetView } from "react-icons/fa";
import {
  DashboardSidebar,
  Markers,
  MenuItem,
  StreetViewModal,
} from "@/components";

import {
  usePrefetchStreetView,
  useReverseGeocode,
  useStreetView,
} from "@/hooks";
// Data imports removed - not currently in use

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
    name: "",
  });

  // Hooks de React Query
  const streetViewData = useStreetView(
    selectedLocation.lat,
    selectedLocation.lng,
    { size: "800x400" }
  );

  const addressData = useReverseGeocode(currentCenter.lat, currentCenter.lng);

  const { prefetchAvailability } = usePrefetchStreetView();

  // Función para abrir Street View
  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setStreetViewOpen(true);
    // Precargar datos cuando se abre
    prefetchAvailability(lat, lng);
  };
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-screen w-full">
        <DashboardSidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Controles de navegación personalizados */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-nasa-black rounded-md shadow-lg p-2">
            <div className="text-xs text-nasa-grey space-y-1">
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
                <div className="pt-1 border-t border-nasa-grey/20 mt-1">
                  <p
                    className="text-xs text-nasa-grey/80 truncate max-w-48"
                    title={addressData.data.results[0].formatted_address}
                  >
                    📍 {addressData.data.results[0].formatted_address}
                  </p>
                </div>
              )}
              {addressData.isLoading && (
                <div className="pt-1 border-t border-nasa-grey/20 mt-1">
                  <p className="text-xs text-nasa-grey">🔄 Obtaining data...</p>
                </div>
              )}
            </div>
          </div>

          {/* Botón para Street View del centro actual */}
          <button
            onClick={() =>
              openStreetView(
                currentCenter.lat,
                currentCenter.lng,
                "Vista actual"
              )
            }
            className="bg-nasa-black text-nasa-grey p-2 rounded-md shadow-lg hover:bg-nasa-primary transition-colors flex items-center gap-2"
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
          onCameraChanged={(ev) => {
            setCurrentZoom(ev.detail.zoom);
            setCurrentCenter(ev.detail.center);
          }}
        >
          <Markers points={activeItem} />
          {/* <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker> */}
          <AdvancedMarker position={position}>
            <div className="relative">
              <img
                src="/naki_yoho.png" // 👈 desde /public
                alt="Marker"
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
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
