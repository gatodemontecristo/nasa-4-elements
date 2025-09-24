/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { GoGoal } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { FaStreetView, FaTimes } from "react-icons/fa";
import { DashboardSidebar, Markers } from "@/components";
import winds from "../../../data/wind-turbine";

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

  // Función para generar URL de Street View
  const getStreetViewImageUrl = (
    lat: number,
    lng: number,
    options: {
      size?: string;
      fov?: number;
      heading?: number;
      pitch?: number;
      key?: string;
    } = {}
  ) => {
    const {
      size = "600x400",
      fov = 90,
      heading = 0,
      pitch = 0,
      key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    } = options;

    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${key}`;
  };

  // Función para abrir Street View
  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setStreetViewOpen(true);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-screen w-full">
        <DashboardSidebar />

        {/* Controles de navegación personalizados */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-nasa-secondary rounded-md  shadow-lg p-2">
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
            className="bg-nasa-secondary text-nasa-grey p-2 rounded-md shadow-lg hover:bg-nasa-primary transition-colors flex items-center gap-2"
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
          <Markers points={winds} />
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
          {/* <AdvancedMarker
            position={position}
            onClick={() => setCustomPinOpen(true)}
          >
            <div className="relative">
              <Image
                src="/naki_yoho.png" // 👈 desde /public
                alt="Naki Yoho"
                fill
                className="w-12 h-12 rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
                priority
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white shadow-sm"></div>
              </div>
            </div>
          </AdvancedMarker> */}

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Im in Hamburg</p>
            </InfoWindow>
          )}
        </Map>

        {/* Modal de Street View */}
        {streetViewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-nasa-secondary rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-nasa-grey font-bold text-lg">
                  Street View - {selectedLocation.name}
                </h3>
                <button
                  onClick={() => setStreetViewOpen(false)}
                  className="text-nasa-grey hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <img
                  src={getStreetViewImageUrl(
                    selectedLocation.lat,
                    selectedLocation.lng,
                    { size: "800x400" }
                  )}
                  alt={`Street View de ${selectedLocation.name}`}
                  className="rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-streetview.jpg";
                  }}
                />
                <div className="text-nasa-grey text-sm">
                  <p>
                    Coordenadas: {selectedLocation.lat.toFixed(6)},{" "}
                    {selectedLocation.lng.toFixed(6)}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Nota: Si no se muestra la imagen, es posible que no haya
                    Street View disponible en esta ubicación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </APIProvider>
  );
}
