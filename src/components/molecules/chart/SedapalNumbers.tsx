'use client';
import Image from 'next/image';
import React from 'react';
import { useCountAnimation, useFormattedWaterData } from '../../../hooks';
import { LoadSpinner, LoadSpinnerChart, NotFound, SedapalStats, TitleJetbrains } from '../../atoms';
import { SystemAlerts } from '../SystemAlerts';

interface SedapalNumbersProps {
  extended?: boolean;
}
export const SedapalNumbers = ({ extended }: SedapalNumbersProps) => {
  const { data, isLoading, isError } = useFormattedWaterData();

  const animatedPercentile10 = useCountAnimation(data?.connections.percentile10 || '0');
  const animatedPercentile25 = useCountAnimation(data?.connections.percentile25 || '0', 2200);
  const animatedPercentile75 = useCountAnimation(data?.connections.percentile75 || '0', 2400);
  const animatedMedian = useCountAnimation(data?.connections.median || '0', 2600);

  if (isError) return <NotFound></NotFound>;
  if (isLoading || !data)
    return extended ? (
      <LoadSpinnerChart type="sedapal"></LoadSpinnerChart>
    ) : (
      <LoadSpinner></LoadSpinner>
    );

  return (
    <>
      <div className="mt-2 flex items-center justify-center gap-3">
        <Image
          src="/sedapal.jpg"
          alt="Sedapal Development Analysis"
          width={200}
          height={200}
          className="h-auto w-1/3 rounded-lg object-cover shadow-lg"
          priority
        ></Image>
        <div className="flex flex-col items-center justify-center">
          <TitleJetbrains title="CONNECTION DISTRIBUTION" />
          <div className="mt-2 grid grid-cols-2 items-center justify-center gap-2">
            <SedapalStats value={animatedPercentile10} label="10th Percentile" />
            <SedapalStats value={animatedPercentile25} label="25th Percentile" />
            <SedapalStats value={animatedPercentile75} label="75th Percentile" />
            <SedapalStats value={animatedMedian} label="Median" />
          </div>
        </div>
      </div>
      {extended && <SystemAlerts />}
    </>
  );
};
