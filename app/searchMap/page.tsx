'use client';

import Head from 'next/head';
import Search from '@/components/Search';
import Mapbox from '@/components/Mapbox';
import FilterComponent from '@/components/FilterComponent';
import { useEffect, useState } from 'react';
import { Park } from '@/types/park';
import { useRouter } from 'next/navigation';
import NavigationBar from "@/components/NavigationBar";

export default function SearchMap() {
  const [parks, setParks] = useState<Park[]>([]);
  const router = useRouter();

  const onNavigate = (page: string) => {
    if (page === 'explore') {
      router.push('/searchMap');
    } else if (page === 'saved') {
      router.push('/saved_parks');
    }
  };

  useEffect(() => {
    fetch('/api/parkLocations')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setParks(data);
      })
      .catch((error) => {
        console.error('Error fetching parks:', error);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Search Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <Mapbox parks={parks} />
          <Search />
          <FilterComponent />
        </div>

        <div className="bg-white border-t z-10">
          <NavigationBar onNavigate={onNavigate} />
        </div>
      </main>
    </div>
  );
}
