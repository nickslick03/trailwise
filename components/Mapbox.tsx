// components/Mapbox.js
import { useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.css';
import { createRoot } from 'react-dom/client';
import ParkBox from './ParkBox';
import convertRuleKey from '@/functions/convertRuleKeys';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Mapbox = ({ parks }: { parks: any[] }) => {
  const [error, setError] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize Mapbox
  useEffect(() => {
    try {
      const mapInstance = new mapboxgl.Map({
        container: 'map', // ID of the element to render the map
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        center: [-77.4, 41.5], // Starting position [lng, lat]
        zoom: 9 // Starting zoom level
      });
      setMap(mapInstance);

      // Cleanup on unmount
      return () => mapInstance.remove();
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setError(true);
    }
  }, []);

  // Display user's location
  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.flyTo({
            center: [longitude, latitude],
            zoom: 12
          });

          // Marker at user's location
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
    if (!map) return;

    const markers: mapboxgl.Marker[] = [];

    parks.forEach((park) => {
      const marker = new mapboxgl.Marker({ color: 'green' })
        .setLngLat([park.longitude, park.latitude])
        .addTo(map);

      // Create a container for the React component
      const popupContainer = document.createElement('div');
      const root = createRoot(popupContainer);

      // Render the React component into the container
      root.render(
        <ParkBox
          id={park.id}
          name={park.name}
          rules={Object.entries(park.rules).map(
            ([key, value]) => `${convertRuleKey(key)}: ${value}`
          )}
        />
      );

      // Create a popup and set its content to the React component
      const popup = new mapboxgl.Popup({
        offset: 25,
        maxWidth: 'none',
        closeButton: false,
        className: 'custom-popup'
      }).setDOMContent(popupContainer);

      // Attach the popup to the marker
      marker.setPopup(popup);

      // Add marker to the array for cleanup
      markers.push(marker);
    });

    // Cleanup markers on unmount
    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
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
