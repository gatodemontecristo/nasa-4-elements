"use client";
import { useStreetView } from "@/hooks";
import Image from "next/image";
import React from "react";
import { GrLocationPin } from "react-icons/gr";
import { CloseSidebar, InfoSkeleton } from "../atoms";
import { getElementIcon } from "@/utils";
import { UnderlinedTitle } from "../molecules";
import { useSidebarStore } from "@/store";

export interface InformationSidebarProps {
  onClose?: () => void;
}
export const InformationSidebar = ({ onClose }: InformationSidebarProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();
  const streetViewData = useStreetView(
    activeSubItem?.lat || 0,
    activeSubItem?.lng || 0,
    { size: "800x400" }
  );
  if (!activeItem) return null;
  const { url, isAvailable, isLoading, error } = streetViewData;
  if (!activeSubItem) return null;
  const elementIcon = getElementIcon(activeItem.id, activeSubItem.type);
  return (
    <div
      className="bg-nasa-black w-80 h-full rounded-md shadow-2xl ml-2 transform transition-all duration-500 ease-in-out
                     animate-in slide-in-from-right-5 fade-in-0 overflow-hidden"
    >
      <div className="relative p-6 h-full overflow-y-auto custom-scroll">
        {(() => {
          return (
            <>
              {/* Header */}
              <UnderlinedTitle
                title={activeSubItem.name}
                icon={elementIcon.icon}
                iconColor={activeItem.color}
                textColor="text-white"
                isFantasy={true}
              />
              {isLoading ? (
                <InfoSkeleton></InfoSkeleton>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="relative h-64 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {error && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-full object-cover"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable === false && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-full object-cover"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable && (
                      <Image
                        src={url}
                        alt={`Street View de ${activeSubItem.name}`}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-full object-cover"
                        priority
                        unoptimized={true}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                  <div className="text-nasa-grey text-sm">
                    <div className="flex flex-row ">
                      <span className="flex items-center gap-1">
                        <GrLocationPin />{" "}
                        <p>Lat: {activeSubItem.lat.toFixed(4)}, </p>
                      </span>
                      <span className="flex items-center gap-1">
                        <GrLocationPin />{" "}
                        <p>Lng: {activeSubItem.lng.toFixed(4)}</p>
                      </span>
                    </div>

                    {isAvailable !== undefined && (
                      <p
                        className={`mt-1 ${
                          isAvailable ? "text-green-500" : "text-yellow-400"
                        }`}
                      >
                        State:{" "}
                        {isAvailable
                          ? "Street View available"
                          : "Street View not available"}
                      </p>
                    )}

                    <p className="mt-2 text-[10px] text-nasa-grey">
                      Street View images are provided by the Google Maps API
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        })()}

        <CloseSidebar onClick={onClose} />
      </div>
    </div>
  );
};
