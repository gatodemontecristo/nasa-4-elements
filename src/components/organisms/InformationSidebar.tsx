'use client';
import { useAverageAirValues, useCompleteEarthData, useStreetView } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { GrLocationPin } from 'react-icons/gr';
import { CloseSidebar, InfoSkeleton } from '../atoms';
import { getElementIcon } from '@/utils';
import {
  CardFooter,
  CardInfoSection,
  CardMainInfo,
  DoughnutNasa,
  UnderlinedTitle,
} from '../molecules';
import { useSidebarStore } from '@/store';

export interface InformationSidebarProps {
  onClose?: () => void;
}
export const InformationSidebar = ({ onClose }: InformationSidebarProps) => {
  const { activeItem, activeSubItem } = useSidebarStore();
  const streetViewData = useStreetView(activeSubItem?.lat || 0, activeSubItem?.lng || 0, {
    size: '800x400',
  });
  const { data: completeEarthData } = useCompleteEarthData(
    activeSubItem
      ? { lat: Number(activeSubItem.lat.toFixed(4)), lon: Number(activeSubItem.lng.toFixed(4)) }
      : { lat: 0, lon: 0 },
    !!activeSubItem
  );
  const { data: averageAirValues } = useAverageAirValues(
    activeSubItem
      ? { latitude: activeSubItem.lat, longitude: activeSubItem.lng }
      : { latitude: 0, longitude: 0 },
    !!activeSubItem
  );

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
                  <div className="rounded-lg bg-gray-900/50 p-2">
                    <h3 className="mb-3 text-sm font-semibold text-white">Air Quality Analysis</h3>
                    <DoughnutNasa
                      data={
                        averageAirValues
                          ? [
                              averageAirValues.pm10 || 0,
                              averageAirValues.pm2_5 || 0,
                              (averageAirValues.carbon_dioxide || 0) / 10,
                              averageAirValues.nitrogen_dioxide || 0,
                              (averageAirValues.methane || 0) / 100,
                            ]
                          : [25, 15, 45, 20, 30]
                      }
                      label="Air Quality Pollutants"
                      height="h-50"
                    ></DoughnutNasa>
                  </div>

                  {/* Earth Quality Analysis */}
                  <div className="rounded-lg bg-gray-900/50 p-4">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Urban Development Analysis
                    </h3>

                    {completeEarthData ? (
                      <div className="space-y-4">
                        <CardMainInfo riskLevelColor={completeEarthData.prediction.riskLevel.color}>
                          <CardMainInfo.Title
                            title={'Risk Assessment'}
                            color={completeEarthData.prediction.riskLevel.bg}
                            level={completeEarthData.prediction.riskLevel.level}
                          />
                          <CardMainInfo.Info
                            items={[
                              {
                                title: 'Probability:',
                                children: (
                                  <p>
                                    {(completeEarthData.prediction.probabilidad * 100).toFixed(1)}%
                                  </p>
                                ),
                              },
                              {
                                title: 'Classification:',
                                children: <p> {` ${completeEarthData.prediction.clase} `}</p>,
                              },
                            ]}
                            footer={completeEarthData.prediction.riskLevel.description}
                          />
                        </CardMainInfo>
                        <div className="grid grid-cols-1 gap-3">
                          <CardInfoSection
                            title="NDVI"
                            value={completeEarthData.features.ndvi.value.toFixed(3)}
                            status={completeEarthData.features.ndvi.interpretation.status}
                            description={completeEarthData.features.ndvi.interpretation.description}
                            color="green"
                          ></CardInfoSection>
                          <CardInfoSection
                            title="NTL"
                            value={completeEarthData.features.ntl.value.toFixed(3)}
                            status={completeEarthData.features.ntl.interpretation.status}
                            description={completeEarthData.features.ntl.interpretation.description}
                            color="yellow"
                          ></CardInfoSection>
                          <CardInfoSection
                            title="SLOPE"
                            value={`${completeEarthData.features.slope.value.toFixed(1)}°`}
                            status={completeEarthData.features.slope.interpretation.status}
                            description={
                              completeEarthData.features.slope.interpretation.description
                            }
                            color="blue"
                          ></CardInfoSection>
                        </div>
                        <CardFooter
                          title="Coordinates:"
                          description={`${completeEarthData.coordinates.lat.toFixed(4)}, ${completeEarthData.coordinates.lon.toFixed(4)}`}
                          final="Analysis based on satellite imagery and machine learning predictions"
                        ></CardFooter>
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center">
                        <div className="text-center">
                          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
                          <p className="text-xs text-gray-400">Loading earth analysis...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Info */}
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
