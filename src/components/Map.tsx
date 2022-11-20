import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(13.7169);
  const [lat] = useState(51.02955);
  const [zoom] = useState(11);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://jsjohann.github.io/mario-howard-keramik/map/style.json`,
      center: [lng, lat],
      zoom: zoom,
      minZoom: 11,
      maxZoom: 18,
      maxBounds: [[13, 50.8], [14.4, 51.2]]
    });

  });

  return (
    <div style={mapWraperStyle}>
      <div ref={mapContainer} style={mapContainerStyle} />
    </div>
  );
}