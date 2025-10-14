'use client';
import { useStreetView } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { GrLocationPin } from 'react-icons/gr';
import { CloseSidebar, ExpandedButton, InfoSkeleton } from '../atoms';
import { getElementIcon } from '@/utils';
import {
  CardMainInfo,
  DoughnutNasa,
  SedapalNumbers,
  SoilInfoNasa,
  UnderlinedTitle,
} from '../molecules';
import { useSidebarStore } from '@/store';
import { UrbanFormComplete } from './UrbanFormComplete';

export interface InformationSidebarProps {
  onClose?: () => void;
}
export const InformationSidebar = ({ onClose }: InformationSidebarProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();
  const streetViewData = useStreetView(activeSubItem?.lat || 0, activeSubItem?.lng || 0, {
    size: '800x400',
  });

  if (!activeItem) return null;
  const { url, isAvailable, isLoading, error } = streetViewData;
  if (!activeSubItem) return null;
  const elementIcon = getElementIcon(activeItem.id, activeSubItem.type);
  return (
    <div className="bg-nasa-black animate-in slide-in-from-right-5 fade-in-0 ml-2 h-full w-100 transform overflow-hidden rounded-md shadow-2xl transition-all duration-500 ease-in-out">
      <div className="custom-scroll relative h-full overflow-y-auto p-6">
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
                  {/* Street View Image */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-gray-800">
                    {error && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable === false && (
                      <Image
                        src="/not-found.jpg"
                        alt="Not Found"
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                      />
                    )}

                    {!isLoading && !error && isAvailable && (
                      <Image
                        src={url}
                        alt={`Street View de ${activeSubItem.name}`}
                        width={800}
                        height={400}
                        className="h-full w-full rounded-lg object-cover shadow-lg"
                        priority
                        unoptimized={true}
                        onError={e => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <CardMainInfo
                    riskLevelColor={isAvailable ? 'text-green-600' : 'text-nasa-orange'}
                  >
                    <CardMainInfo.Title
                      title={'Street view status'}
                      color={isAvailable ? 'bg-green-600' : 'bg-nasa-orange'}
                      level={isAvailable ? 'Available' : 'Not Available'}
                    />
                    <CardMainInfo.Info
                      items={[
                        {
                          title: 'Latitude',
                          children: (
                            <>
                              <GrLocationPin /> <p>Lat: {activeSubItem.lat.toFixed(4)} </p>
                            </>
                          ),
                        },
                        {
                          title: 'Longitude',
                          children: (
                            <>
                              <GrLocationPin /> <p>Lng: {activeSubItem.lng.toFixed(4)}</p>
                            </>
                          ),
                        },
                      ]}
                      footer="Street View images are provided by the Google Maps API"
                    />
                  </CardMainInfo>

                  {/* Air Quality Chart */}
                  <div className="rounded-lg bg-black/40 p-4">
                    <h3 className="mb-3 text-sm font-semibold text-white">Air Quality Analysis</h3>
                    <DoughnutNasa
                      label="Air Quality Pollutants"
                      height="h-50"
                      activeSubItem={activeSubItem}
                    ></DoughnutNasa>
                  </div>

                  {/* Earth Quality Analysis */}
                  <div className="rounded-lg bg-black/40 p-4">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Urban Development Analysis
                    </h3>
                    <UrbanFormComplete activeSubItem={activeSubItem}></UrbanFormComplete>
                  </div>

                  <div className="rounded-lg bg-black/40 p-4">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Sedapal Development Analysis
                    </h3>
                    <SedapalNumbers></SedapalNumbers>
                  </div>
                  <div className="rounded-lg bg-black/40 p-4">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Soil Moisture Analysis
                    </h3>
                    <SoilInfoNasa activeSubItem={activeSubItem}></SoilInfoNasa>
                  </div>

                  <ExpandedButton
                    icon={activeItem.icon}
                    color={activeItem.bg}
                    text={'More Details'}
                  />
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
