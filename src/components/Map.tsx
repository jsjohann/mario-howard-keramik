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
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://jsjohann.github.io/mario-howard-keramik/static/map/style.json`,
      center: [lng, lat],
      zoom: zoom
    });

  });

  return (
    <div style={mapWraperStyle}>
      <div ref={mapContainer} style={mapContainerStyle} />
    </div>
  );
}