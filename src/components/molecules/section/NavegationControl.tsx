import { StreetviewButton, TextIcon, TextLoading } from '../../atoms';
import { GoGoal } from 'react-icons/go';
import { GrLocationPin } from 'react-icons/gr';
import { useCoordinatesStore } from '../../../store';
import { useReverseGeocode } from '../../../hooks';

interface NavegationControlProps {
  onClick?: () => void;
}
export const NavegationControl = ({ onClick }: NavegationControlProps) => {
  const { currentZoom, currentCenter } = useCoordinatesStore();
  const addressData = useReverseGeocode(currentCenter.lat, currentCenter.lng);
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <div className="bg-nasa-black rounded-md p-2 shadow-lg">
        <div className="text-nasa-grey space-y-1 text-xs">
          <TextIcon icon={<GoGoal />} text={`Zoom: ${currentZoom.toFixed(4)}`} />
          <TextIcon icon={<GrLocationPin />} text={`Lat: ${currentCenter.lat.toFixed(4)}`} />
          <TextIcon icon={<GrLocationPin />} text={`Lng: ${currentCenter.lng.toFixed(4)}`} />
          <TextLoading isShow={addressData.isFetching} label="🔄 Obtaining data..." />
        </div>
      </div>
      <StreetviewButton onClick={onClick}></StreetviewButton>
    </div>
  );
};
