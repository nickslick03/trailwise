'use client';

import Mapbox from '@/components/Mapbox';
import { useEffect, useState } from 'react';

export default function Home() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    fetch('/api/parkLocations').then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      response.json().then((data) => {
        console.log(data);
      });
    });
  });

  return (
    <div className='w-full h-full'>
      <main className='w-full h-full'>
        <Mapbox parks={parks} />
      </main>
    </div>
  );
}
