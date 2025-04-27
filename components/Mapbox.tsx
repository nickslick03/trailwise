// components/Map.js
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Mapbox = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const map = new mapboxgl.Map({
        container: 'map', // ID of the element to render the map
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        center: [-77.4, 41.5], // Starting position [lng, lat]
        zoom: 9 // Starting zoom level
      });

      // Cleanup on unmount
      return () => map.remove();
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setError(true);
    }
  }, []);

  return error ? (
    <div className='w-full h-full flex justify-center items-center'>
      Error Initializing Mapbox
    </div>
  ) : (
    <div id='map' className='w-full h-full' />
  );
};

export default Mapbox;
