'use client';

import Head from 'next/head';
import Search from '@/components/Search';
import Mapbox from '@/components/Mapbox';
import FilterComponent from '@/components/FilterComponent';
import { useEffect, useState } from 'react';
import { Park } from '@/types/park';
//import NavigationBar from "@/components/NavigationBar";

export default function SearchMap() {
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    fetch('/api/parkLocations').then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      response.json().then((data) => {
        setParks(data);
      });
    });
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 bg-gray-100'>
      <Head>
        <title>Search Parks</title>
      </Head>

      <main className='max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh]'>
        <Mapbox parks={parks} />
        <Search />
        <FilterComponent />
        {/* <NavigationBar /> */}
      </main>
    </div>
  );
}
