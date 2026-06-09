# Maps / Location App

## Problem Statement

Design a React map experience (Uber/Airbnb-style) that:

- **Map rendering:** Pan/zoom smoothly with tile-based basemap (Mapbox GL / Leaflet)
- **Markers:** Thousands of points without DOM overload—cluster at low zoom, expand at high zoom
- **Data loading:** Fetch only markers inside current viewport bounds + zoom level
- **Geolocation:** "Use my location" with permission handling and accuracy fallback
- **Interaction:** Click marker → detail panel; search places → fly to result
- **Performance:** Debounce bounds-changed events; cancel stale fetches

## System Architecture

- **Client Layer:** Map container, marker/cluster layer, bounds hook, detail sidebar, geolocation control
- **API Layer:** `GET /places?bbox=&zoom=` returning GeoJSON FeatureCollection; geocode endpoint for search
- **Data Layer:** PostGIS / spatial index; tile CDN for basemap (Mapbox, OSM)

```text
Pan/zoom ──► debounce moveend ──► bbox + zoom ──► GET /places?bbox=
                                                      │
                                                      ▼
                                            Supercluster ──► render clusters/markers
```

## Key Technical Decisions

### 1. Map library: Mapbox GL vs. Leaflet

| Mapbox GL | Leaflet + raster tiles |
|-----------|------------------------|
| WebGL vector tiles, smooth styling | Simpler, lighter bundle |
| Built-in clustering options | Pair with `react-leaflet` + Supercluster |
| Heavier bundle, API key cost | Great default for interviews |

For React interviews, emphasize **viewport-driven data** and **clustering math**, not tile provider politics.

### 2. Marker clustering (Supercluster)

At zoom 10, 5,000 markers become ~40 clusters. Supercluster builds a spatial index once; `getClusters(bbox, zoom)` returns clusters + leaves in O(log n).

Re-index when the **dataset for the current region** changes—not on every pan (pan uses same index, new bbox query).

### 3. Viewport-based fetching

On `moveend`, read `map.getBounds()` → `west,south,east,north`. Include `zoom` so server can simplify geometries or return pre-aggregated clusters for low zoom.

Debounce 150–300ms during drag; fetch immediately on `zoomend`.

### 4. Tile loading

Basemap tiles load automatically from the provider. **Do not** re-fetch business markers on every tile load—decouple marker API from tile CDN.

Cache marker responses in React Query: `queryKey: ['places', bboxKey, zoom]` with short `staleTime`.

## Implementation: Core Components

### Bounds hook with debounced fetch

```tsx
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Supercluster from 'supercluster';

type Place = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price?: number;
};

function bboxKey(bounds: L.LatLngBounds, zoom: number) {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return `${sw.lng.toFixed(3)},${sw.lat.toFixed(3)},${ne.lng.toFixed(3)},${ne.lat.toFixed(3)}:${zoom}`;
}

async function fetchPlacesInBbox(bbox: string, zoom: number, signal: AbortSignal) {
  const res = await fetch(`/api/places?bbox=${bbox}&zoom=${zoom}`, { signal });
  if (!res.ok) throw new Error('Failed to load places');
  return res.json() as Promise<Place[]>;
}

export function useMapPlaces(bounds: L.LatLngBounds | null, zoom: number) {
  const key = bounds ? bboxKey(bounds, zoom) : null;

  return useQuery({
    queryKey: ['places', key],
    queryFn: ({ signal }) => {
      if (!bounds) return [];
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const bbox = `${sw.lng},${sw.lat},${ne.lng},${ne.lat}`;
      return fetchPlacesInBbox(bbox, zoom, signal);
    },
    enabled: !!bounds && zoom >= 8,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

export function useClusters(places: Place[], bounds: L.LatLngBounds | null, zoom: number) {
  const index = useMemo(() => {
    const sc = new Supercluster({ radius: 60, maxZoom: 16 });
    sc.load(
      places.map((p) => ({
        type: 'Feature',
        properties: { cluster: false, place: p },
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
      }))
    );
    return sc;
  }, [places]);

  if (!bounds) return [];
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return index.getClusters([sw.lng, sw.lat, ne.lng, ne.lat], Math.floor(zoom));
}
```

### Map shell with geolocation

```tsx
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useCallback, useState } from 'react';
import { useMapPlaces, useClusters } from './useMapPlaces';

function MapEvents({ onBoundsChange }: { onBoundsChange: (b: L.LatLngBounds, z: number) => void }) {
  const map = useMap();
  useMapEvents({
    moveend: () => onBoundsChange(map.getBounds(), map.getZoom()),
    zoomend: () => onBoundsChange(map.getBounds(), map.getZoom()),
  });
  return null;
}

export function PlacesMap() {
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [zoom, setZoom] = useState(12);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onBoundsChange = useCallback((b: L.LatLngBounds, z: number) => {
    setBounds(b);
    setZoom(z);
  }, []);

  const { data: places = [], isFetching } = useMapPlaces(bounds, zoom);
  const clusters = useClusters(places, bounds, zoom);

  function goToMyLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // map.flyTo([latitude, longitude], 14) via ref or map instance
      },
      () => alert('Location permission denied')
    );
  }

  return (
    <div className="map-layout">
      <MapContainer center={[37.77, -122.42]} zoom={12} className="map-root">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents onBoundsChange={onBoundsChange} />
        {clusters.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          const isCluster = feature.properties.cluster;
          return (
            <Marker
              key={isCluster ? `c-${feature.id}` : feature.properties.place.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () =>
                  isCluster
                    ? null /* zoom in */
                    : setSelectedId(feature.properties.place.id),
              }}
            />
          );
        })}
      </MapContainer>
      {isFetching && <div className="map-loading">Updating…</div>}
      <button type="button" onClick={goToMyLocation}>Use my location</button>
      {selectedId && <PlaceDetail id={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
```

### Server: bbox query (PostGIS sketch)

```tsx
// GET /api/places?bbox=west,south,east,north&zoom=12
// SQL: ST_MakeEnvelope(west, south, east, north, 4326) && location
// Low zoom: return aggregated grid cells; high zoom: individual rows LIMIT 500
```

## Performance Optimization

- Debounce `moveend` during continuous pan; immediate fetch on `zoomend`
- Supercluster index rebuilt only when `places` array identity changes
- Limit markers per request (500); show "Zoom in for more" below threshold zoom
- Use `placeholderData` so panning does not flash empty map
- Lazy-load map chunk: `const Map = lazy(() => import('./PlacesMap'))`—Leaflet is heavy

## Edge Cases and Error Handling

- **Crosses antimeridian:** Normalize bbox or split query—common gotcha in Pacific maps
- **Empty bbox at world zoom:** Skip fetch or use server-side aggregation only
- **Geolocation denied:** Hide button or show manual search fallback
- **Stale bbox response:** AbortController on new bounds; ignore if `bboxKey` changed
- **Mobile:** Full-screen map; bottom sheet for detail instead of sidebar

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| Client-side Supercluster | Fast pan within loaded set; works offline | Must load all points in region first |
| Server-side clustering | Smaller payloads at low zoom | Extra API complexity; cluster click needs expansion endpoint |
| Mapbox built-in clustering | Less glue code | Vendor lock-in; harder to customize marker React components |

## Interview Talking Points

- Clustering reduces DOM nodes from thousands to dozens—critical for React reconciliation cost
- Bbox queries need a **spatial index** (PostGIS GiST)—table scan fails at scale
- Contrast with photo gallery: maps are **geo-indexed**, **zoom-level aware**, and **continuous pan** not paginated scroll
- Mention vector vs. raster tiles if interviewer goes deep on rendering pipeline
