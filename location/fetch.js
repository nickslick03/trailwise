// this code is made to fetch the users location from their device
  
'use client';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapComponent() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // This should match the id of the div where you want the map
      style: 'mapbox://styles/mapbox/streets-v11', // or any other map style
      center: [-74.5, 40], // default center before we get user location
      zoom: 9
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude);

          // Move map to user's location
          map.flyTo({
            center: [longitude, latitude],
            zoom: 12
          });

          // marker at user's location
          new mapboxgl.Marker({ color: 'red' })
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

    // Cleanup map on unmount
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}
