// components/Mapbox.js
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Mapbox = ({ parks }: { parks: any[] }) => {
  const [error, setError] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize Mapbox
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

  // Display user's location
  useEffect(() => {
    if (map === null) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.flyTo({
            center: [longitude, latitude],
            zoom: 12
          });
          // marker at user's location
          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .addTo(map);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [map]);

  // Display parks on map
  useEffect(() => {
    if (map === null) return;

    parks.forEach((park) => {
      const marker = new mapboxgl.Marker({ color: 'green' })
        .setLngLat([park.longitude, park.latitude])
        .addTo(map);
      marker.getElement().addEventListener('click', () => {
        window.location.href = park.link_url;
      });
    });
  }, [map, parks]);

  return error ? (
    <div className='w-full h-full flex justify-center items-center'>
      Error Initializing Mapbox
    </div>
  ) : (
    <div id='map' className='w-full h-full' />
  );
};

export default Mapbox;
