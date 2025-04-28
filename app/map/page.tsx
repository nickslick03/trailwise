'use client';

import Mapbox from '@/components/Mapbox';
import { useEffect } from 'react';

export default function Home() {
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
        <Mapbox />
      </main>
    </div>
  );
}
