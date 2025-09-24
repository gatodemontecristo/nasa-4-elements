# Google Maps API con TanStack React Query

Esta implementación utiliza TanStack React Query para optimizar las llamadas a la API de Google Maps, proporcionando cache automático, estados de carga, y manejo de errores.

## 🚀 Características

- ✅ **Cache inteligente** - Evita llamadas duplicadas a la API
- ✅ **Estados de carga** - `isLoading`, `error`, `data` automáticamente
- ✅ **Revalidación automática** - Mantiene los datos frescos
- ✅ **Prefetch** - Precarga datos para mejor UX
- ✅ **TypeScript** - Tipado completo
- ✅ **Optimización** - Background updates y stale-while-revalidate

## 📦 Instalación

```bash
yarn add @tanstack/react-query @tanstack/react-query-devtools
```

## 🔧 Configuración

### 1. Provider Setup (Ya configurado en `layout.tsx`)

```tsx
import { Providers } from "@/components/providers/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 2. Variables de Entorno

Asegúrate de tener tu API key en `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 🎯 Hooks Disponibles

### `useStreetView(lat, lng, options?)`

Combina URL de Street View y verificación de disponibilidad:

```tsx
const { url, isAvailable, isLoading, error } = useStreetView(
  -12.0201464,
  -76.8175454,
  { size: "800x400", fov: 90 }
);
```

### `useStreetViewUrl(lat, lng, options?)`

Genera URL de Street View (síncrono):

```tsx
const streetViewUrl = useStreetViewUrl(lat, lng, {
  size: "600x400",
  fov: 120,
  heading: 0,
  pitch: 0,
});
```

### `useStreetViewAvailability(lat, lng)`

Verifica si Street View está disponible:

```tsx
const {
  data: isAvailable,
  isLoading,
  error,
} = useStreetViewAvailability(lat, lng);
```

### `useGeocode(address)`

Convierte dirección en coordenadas:

```tsx
const {
  data: geocodeResult,
  isLoading,
  error,
} = useGeocode("1600 Amphitheatre Parkway");
```

### `useReverseGeocode(lat, lng)`

Convierte coordenadas en dirección:

```tsx
const { data: addressData, isLoading, error } = useReverseGeocode(lat, lng);
```

### `useGeocodeMutation()`

Para búsquedas dinámicas de direcciones:

```tsx
const geocodeMutation = useGeocodeMutation();

const handleSearch = async () => {
  try {
    const result = await geocodeMutation.mutateAsync(address);
    console.log(result.results[0].geometry.location);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### `usePrefetchStreetView()`

Para precargar datos:

```tsx
const { prefetchAvailability, prefetchReverseGeocode } =
  usePrefetchStreetView();

// Precargar al hacer hover sobre un marcador
const handleMarkerHover = (lat, lng) => {
  prefetchAvailability(lat, lng);
  prefetchReverseGeocode(lat, lng);
};
```

## 🎨 Componentes

### StreetViewModal

Modal optimizado para mostrar Street View:

```tsx
<StreetViewModal
  isOpen={streetViewOpen}
  onClose={() => setStreetViewOpen(false)}
  location={{ lat, lng, name: "Mi ubicación" }}
  streetViewData={streetViewData}
/>
```

## 💡 Ejemplo de Uso Completo

```tsx
"use client";

import { useState } from "react";
import {
  useStreetView,
  useReverseGeocode,
  usePrefetchStreetView,
} from "@/hooks/useGoogleMaps";
import { StreetViewModal } from "@/components";

export default function MapComponent() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Hooks de React Query
  const streetViewData = useStreetView(
    selectedLocation.lat,
    selectedLocation.lng
  );
  const addressData = useReverseGeocode(
    selectedLocation.lat,
    selectedLocation.lng
  );
  const { prefetchAvailability } = usePrefetchStreetView();

  const openStreetView = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name });
    setModalOpen(true);
    // Precargar datos
    prefetchAvailability(lat, lng);
  };

  return (
    <div>
      {/* Tu mapa aquí */}

      {/* Información de dirección */}
      {addressData.data?.results[0] && (
        <div className="address-info">
          📍 {addressData.data.results[0].formatted_address}
        </div>
      )}

      {/* Modal de Street View */}
      <StreetViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        location={selectedLocation}
        streetViewData={streetViewData}
      />
    </div>
  );
}
```

## ⚡ Optimizaciones Incluidas

1. **Cache Time**: 5-30 minutos dependiendo del tipo de dato
2. **Stale Time**: Los datos se consideran frescos por 5-15 minutos
3. **Retry**: 2 reintentos automáticos en caso de error
4. **Prefetch**: Precarga datos anticipadamente
5. **Background Refetch**: Actualiza datos en segundo plano
6. **Deduplication**: Evita llamadas duplicadas simultáneas

## 🛠️ DevTools

En desarrollo, se incluyen las React Query DevTools para inspeccionar el estado de las queries:

- Ver queries activas
- Estado de cache
- Network requests
- Invalidación manual

## 📋 API de Google Maps Utilizada

- **Street View Static API**: Para imágenes de Street View
- **Street View Metadata API**: Para verificar disponibilidad
- **Geocoding API**: Para convertir direcciones ↔ coordenadas
- **Places API**: Para detalles de lugares (opcional)

## 🔒 Consideraciones de Seguridad

- API key debe estar en variables de entorno
- Restricciones de dominio recomendadas en Google Console
- Rate limiting manejado por React Query
- Error boundaries para fallos de API

## 📈 Monitoreo

Puedes monitorear el uso de la API y performance mediante:

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// Ver estado del cache
console.log(queryClient.getQueryCache().getAll());

// Invalidar queries específicas
queryClient.invalidateQueries({ queryKey: ["streetViewAvailability"] });
```

¡Listo! Ahora tienes una implementación robusta y optimizada de Google Maps API con React Query. 🎉
