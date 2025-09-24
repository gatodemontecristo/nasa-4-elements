// Tipos para la API de Google Maps
export interface StreetViewOptions {
  size?: string;
  fov?: number;
  heading?: number;
  pitch?: number;
  key?: string;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface PlaceDetails {
  place_id: string;
  formatted_address: string;
  name?: string;
  geometry: {
    location: LocationCoordinates;
  };
}

export interface GeocodeResult {
  results: PlaceDetails[];
  status: string;
}
