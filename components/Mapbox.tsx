// components/Map.js
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Replace with your Mapbox access token

const Mapbox = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // ID of the element to render the map
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-77.4, 41.5], // Starting position [lng, lat]
      zoom: 9 // Starting zoom level
    });

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return <div id='map' className='w-full h-full' />;
};

export default Mapbox;
