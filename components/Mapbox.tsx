// components/Map.js
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Mapbox = () => {
  const [error, setError] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    try {
      setMap(
        new mapboxgl.Map({
          container: 'map', // ID of the element to render the map
          style: 'mapbox://styles/mapbox/streets-v11', // Map style
          center: [-77.4, 41.5], // Starting position [lng, lat]
          zoom: 9 // Starting zoom level
        })
      );

      // Cleanup on unmount
      return () => map?.remove();
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (map === null) return;
    new mapboxgl.Marker({ color: 'red' }).setLngLat([-77.4, 41.5]).addTo(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude);

          map.on('load', () => {
            // marker at user's location
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([longitude, latitude])
              .addTo(map);
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [map]);

  return error ? (
    <div className='w-full h-full flex justify-center items-center'>
      Error Initializing Mapbox
    </div>
  ) : (
    <div id='map' className='w-full h-full' />
  );
};

export default Mapbox;
