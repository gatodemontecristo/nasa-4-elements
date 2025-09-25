"use client";
import { MarkNasa } from "@/data";
import { useStreetView } from "@/hooks";
import Image from "next/image";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { InfoSkeleton } from "../atoms";

export interface InformationPanelProps {
  activeSubItem?: MarkNasa;
  onClose?: () => void;
}
export const InformationPanel = ({
  activeSubItem,
  onClose,
}: InformationPanelProps) => {
  const streetViewData = useStreetView(
    activeSubItem?.lat || 0,
    activeSubItem?.lng || 0,
    { size: "800x400" }
  );
  const { url, isAvailable, isLoading, error } = streetViewData;
  if (!activeSubItem) return null;

  return (
    <div
      className="bg-nasa-secondary w-80 h-full rounded-md shadow-2xl ml-2 transform transition-all duration-500 ease-in-out
                     animate-in slide-in-from-right-5 fade-in-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      }}
    >
      <div className="relative p-6 h-full overflow-y-auto custom-scroll">
        {(() => {
          return (
            <>
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-bold mb-2 flex items-center">
                  <span className="mr-3 text-blue-400">
                    <FaLocationArrow />
                  </span>
                  {activeSubItem.name}
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>

                {isLoading ? (
                  <InfoSkeleton></InfoSkeleton>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="relative h-64 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                      {/* {isLoading && (
                   
                      //   <div className="flex flex-col items-center gap-2">
                      //     <FaSpinner className="animate-spin text-nasa-grey text-2xl" />
                      //     <p className="text-nasa-grey text-sm">
                      //       Verificando disponibilidad...
                      //     </p>
                      //   </div>
                    )} */}

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
                            isAvailable ? "text-green-400" : "text-yellow-400"
                          }`}
                        >
                          State:{" "}
                          {isAvailable
                            ? "Street View available"
                            : "Street View not available"}
                        </p>
                      )}

                      <p className="mt-2 text-[10px] text-gray-400">
                        Street View images are provided by the Google Maps API
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })()}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                         rounded-full transition-all duration-200 hover:scale-110 z-10"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
