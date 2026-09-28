import React, { useRef, useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

// maplibre-gl is large, so it is only loaded once the map scrolls into view
const loadMaplibre = async () => {
  const [maplibreModule, workerModule] = await Promise.all([
    //@ts-ignore
    import("!maplibre-gl"),
    //@ts-ignore
    import("maplibre-gl/dist/maplibre-gl-csp-worker")
  ]);
  const maplibregl = maplibreModule.default ?? maplibreModule;
  maplibregl.workerClass = workerModule.default ?? workerModule;
  return maplibregl;
};

const mapWraperStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

const mapContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const MAP_CENTER_LNG = 13.66125;
const MAP_CENTER_LAT = 51.140657;

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const [lng] = useState(MAP_CENTER_LNG);
  const [lat] = useState(MAP_CENTER_LAT);
  const [zoom] = useState(15);

  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;
    let cancelled = false;

    const initMap = async () => {
      const maplibregl = await loadMaplibre();
      if (cancelled || map.current) return;

      map.current = new maplibregl.Map({
        container,
        style: `https://mario-howard.de/map/style.json`,
        center: [lng, lat],
        zoom: zoom,
        minZoom: 11,
        maxZoom: 18,
        maxBounds: [[13, 50.8], [14.4, 51.2]]
      });

      map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

      new maplibregl.Marker({ color: '#8EC8D5' }).setLngLat([MAP_CENTER_LNG, MAP_CENTER_LAT]).addTo(map.current);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        initMap();
      }
    }, { rootMargin: '300px' });
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div style={mapWraperStyle} className="map-wrapper">
      <div ref={mapContainer} style={mapContainerStyle} />
    </div>
  );
}