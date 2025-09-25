"use client";
import { useEffect, useRef, useState } from "react";
type Props = { points: MenuItem | null };
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { MenuItem } from "./DashboardSidebar";
import { TypeMark } from "@/data";
import { getElementIcon } from "@/utils";

export const Markers = ({ points }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {(points?.collection || []).map(([name, type, lat, lng]: TypeMark) => (
        <AdvancedMarker
          position={{ lat, lng }}
          key={JSON.stringify({ name, lat, lng })}
          ref={(marker) =>
            setMarkerRef(marker, JSON.stringify({ name, lat, lng }))
          }
        >
          {getElementIcon(points?.id || "home", type).icon}
        </AdvancedMarker>
      ))}
    </>
  );
};
