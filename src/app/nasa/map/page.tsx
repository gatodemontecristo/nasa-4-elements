'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import {
  DashboardSidebar,
  InformativeMsg,
  LineStockNasa,
  Markers,
  NavegationControl,
  ReturnButton,
  SedapalNumbers,
  SoilInfoNasa,
  StreetViewModal,
  UrbanFormExtended,
} from '@/components';
import { usePrefetchStreetView, useStreetView } from '@/hooks';
import { useCoordinatesStore, useExpandedStore, useSidebarStore } from '@/store';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import clsx from 'clsx';
import { URBAN_DEVELOPMENT_DESCRIPTION } from '../../../constants';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);
export default function Intro() {
  const {
    position,
    open,
    setOpen,
    currentZoom,
    setCurrentZoom,
    currentCenter,
    setCurrentCenter,
    streetViewOpen,
    setStreetViewOpen,
    selectedLocation,
    setSelectedLocation,
  } = useCoordinatesStore();

  const { expanded, expandedItem } = useExpandedStore();

  // Hooks de React Query
  const streetViewData = useStreetView(selectedLocation.lat, selectedLocation.lng, {
    size: '800x400',
  });

  const { prefetchAvailability } = usePrefetchStreetView();

  // Función para abrir Street View
  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setStreetViewOpen(true);
    prefetchAvailability(lat, lng);
  };
  const { activeItem } = useSidebarStore();

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="flex h-screen bg-black/40">
        <div className="relative flex h-full w-full flex-col">
          <div className="absolute top-4 left-4 z-50">
            <ReturnButton></ReturnButton>
          </div>
          <DashboardSidebar />
          <NavegationControl
            onClick={() => openStreetView(currentCenter.lat, currentCenter.lng, 'Current view')}
            className={clsx(
              'transition-all duration-700 ease-in-out',
              expanded
                ? 'pointer-events-none scale-95 opacity-0'
                : 'pointer-events-auto scale-100 opacity-100'
            )}
          />
          <div className={clsx('relative flex w-full flex-row', expanded ? 'h-[50%]' : 'h-full')}>
            <Map
              className={clsx(
                'h-full transition-all duration-700 ease-in-out',
                expanded ? 'w-[60%]' : 'w-full'
              )}
              colorScheme="DARK"
              zoom={currentZoom}
              center={currentCenter}
              mapId={process.env.NEXT_PUBLIC_MAP_ID}
              streetViewControl={false}
              mapTypeControl={false}
              onCameraChanged={ev => {
                setCurrentZoom(ev.detail.zoom);
                setCurrentCenter(ev.detail.center);
              }}
            >
              <Markers points={activeItem} />

              <AdvancedMarker position={position}>
                <div className="relative">
                  <img
                    src="/nasa.png"
                    alt="Marker"
                    className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <div className="h-0 w-0 border-t-[8px] border-r-[6px] border-l-[6px] border-t-white border-r-transparent border-l-transparent"></div>
                  </div>
                </div>
              </AdvancedMarker>

              {open && (
                <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                  <p>Im in Hamburg</p>
                </InfoWindow>
              )}
            </Map>
            {expandedItem && (
              <div className="h-full w-[40%] overflow-y-scroll rounded-lg bg-black/40 p-4">
                <div className="mb-4 flex flex-row items-center gap-3">
                  <h3 className="text-sm font-semibold text-white">Urban Development Analysis</h3>
                  <InformativeMsg
                    top={20}
                    left={-4}
                    message={URBAN_DEVELOPMENT_DESCRIPTION.message}
                  />
                </div>
                <UrbanFormExtended activeSubItem={expandedItem} extended></UrbanFormExtended>
              </div>
            )}
          </div>
          {expanded && (
            <div className={clsx('relative flex h-[50%] w-full flex-row')}>
              {expandedItem && (
                <div className={'h-full w-2/4 overflow-y-scroll bg-black/40 p-4'}>
                  <LineStockNasa activeSubItem={expandedItem} extended />
                </div>
              )}
              <div className="mb-4 flex w-1/4 flex-col gap-3 overflow-y-scroll rounded-lg bg-black/40 p-3">
                <SedapalNumbers extended></SedapalNumbers>
              </div>
              <div className="h-full w-1/4 overflow-y-scroll rounded-lg bg-black/40 p-4">
                <div className="mb-4 flex flex-row items-center gap-3">
                  <h3 className="text-sm font-semibold text-white">General Information Report</h3>
                  <InformativeMsg
                    top={-140}
                    left={-240}
                    message={URBAN_DEVELOPMENT_DESCRIPTION.message}
                  />
                </div>

                {expandedItem && (
                  <SoilInfoNasa activeSubItem={expandedItem} extended></SoilInfoNasa>
                )}
              </div>
            </div>
          )}
          {/* Modal de Street View */}
          {streetViewOpen && (
            <StreetViewModal
              isOpen={streetViewOpen}
              onClose={() => setStreetViewOpen(false)}
              location={selectedLocation}
              streetViewData={streetViewData}
            />
          )}
        </div>
      </div>
    </APIProvider>
  );
}
