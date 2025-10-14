import React from 'react';
import { FaCloudRain, FaCloudShowersHeavy } from 'react-icons/fa6';
import { MdLandscape } from 'react-icons/md';
import { LoadSpinner, LoadSpinnerChart, NotFound } from '../../atoms';
import { MarkNasa } from '../../../data';
import { useSoilAnalysis } from '../../../hooks';
import { IconInfoSection } from '../IconInfoSection';
import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb';
import { GiHeavyTimer } from 'react-icons/gi';

interface SoilInfoNasaProps {
  activeSubItem: MarkNasa;
  extended?: boolean;
}
export const SoilInfoNasa = ({ activeSubItem, extended = false }: SoilInfoNasaProps) => {
  const { data, isLoading, isError } = useSoilAnalysis(
    { latitude: activeSubItem.lat, longitude: activeSubItem.lng },
    !!activeSubItem
  );
  if (isError) return <NotFound extended={extended}></NotFound>;
  if (isLoading || !data)
    return extended ? (
      <LoadSpinnerChart type="general"></LoadSpinnerChart>
    ) : (
      <LoadSpinner></LoadSpinner>
    );
  return (
    <div className="flex w-full flex-col gap-3 p-3">
      <div className="flex w-full flex-row justify-around">
        <IconInfoSection
          icon={<FaCloudShowersHeavy className="mb-2 h-7 w-7" />}
          title="Soil Moisture"
          description={`${data.moisture.latest?.toFixed(2)} m³/m³`}
          className="text-yellow-500"
        />
        <IconInfoSection
          icon={<MdLandscape className="mb-2 h-7 w-7" />}
          title="Elevation"
          description={`${data.location.elevation} ASL`}
          className="text-yellow-500"
        />
      </div>

      {extended && (
        <>
          <div className="flex w-full flex-row justify-around">
            <IconInfoSection
              icon={<FaCloudRain className="mb-2 h-7 w-7" />}
              title="Soil Average"
              description={`${data.moisture.average?.toFixed(2)} m³/m³`}
              className="text-orange-500"
            />
            <IconInfoSection
              icon={<GiHeavyTimer className="mb-2 h-7 w-7" />}
              title="Timezone"
              description={`${data.location.timezone}°`}
              className="text-orange-500"
            />
          </div>
          <div className="flex w-full flex-row justify-around">
            <IconInfoSection
              icon={<TbWorldLatitude className="mb-2 h-7 w-7" />}
              title="Latitude"
              description={`${data.location.latitude}°`}
              className="text-green-500"
            />
            <IconInfoSection
              icon={<TbWorldLongitude className="mb-2 h-7 w-7" />}
              title="Longitude"
              description={`${data.location.longitude}°`}
              className="text-green-500"
            />
          </div>
        </>
      )}
    </div>
  );
};
