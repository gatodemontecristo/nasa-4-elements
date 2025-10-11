import React from 'react';
import { CardFooter, CardMainInfo } from '../molecules';
import { useCompleteEarthData } from '../../hooks';
import { LoadSpinner, NotFound } from '../atoms';
import { MarkNasa } from '../../data';

interface UrbanFormCompleteProps {
  activeSubItem: MarkNasa;
}
export const UrbanFormComplete = ({ activeSubItem }: UrbanFormCompleteProps) => {
  const {
    data: completeEarthData,
    isLoading,
    isError,
  } = useCompleteEarthData(
    activeSubItem
      ? { lat: Number(activeSubItem.lat.toFixed(4)), lon: Number(activeSubItem.lng.toFixed(4)) }
      : { lat: 0, lon: 0 },
    !!activeSubItem
  );
  if (isError) return <NotFound></NotFound>;
  if (isLoading || !completeEarthData) return <LoadSpinner></LoadSpinner>;

  return (
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
              children: <p>{(completeEarthData.prediction.probabilidad * 100).toFixed(1)}%</p>,
            },
            {
              title: 'Classification:',
              children: <p> {` ${completeEarthData.prediction.clase} `}</p>,
            },
          ]}
          footer={completeEarthData.prediction.riskLevel.description}
        />
      </CardMainInfo>
      <CardFooter
        title="Coordinates:"
        description={`${completeEarthData.coordinates.lat.toFixed(4)}, ${completeEarthData.coordinates.lon.toFixed(4)}`}
        final="Analysis based on satellite imagery and machine learning predictions"
      ></CardFooter>
    </div>
  );
};
