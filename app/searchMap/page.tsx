// app/searchMap/page.tsx
'use client'

import Head from 'next/head'
import Search from '@/components/Search'
import Mapbox from '@/components/Mapbox'
import FilterComponent from '@/components/FilterComponent'
import NavigationBar from '@/components/NavigationBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Park } from '@/types/park'

export default function SearchMap() {
  const [parks, setParks] = useState<Park[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/parkLocations')
      .then((res) => res.json())
      .then((data: Park[]) => setParks(data))
      .catch(console.error)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Search Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh] flex flex-col">
        {/* ─── HEADER WITH BACK BUTTON ─── */}
        <div className="flex items-center px-4 py-3 border-b">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            ← Back
          </button>
          <h1 className="flex-1 text-center font-medium">Parks Map</h1>
        </div>

        <div className="relative flex-1 overflow-y-auto">
          <Mapbox parks={parks} />
          <Search />
          <FilterComponent />
        </div>

        <div className="bg-white border-t z-10">
          <NavigationBar
            onNavigate={(page) =>
              router.push(page === 'explore' ? '/searchMap' : '/saved_parks')
            }
          />
        </div>
      </main>
    </div>
  )
}
