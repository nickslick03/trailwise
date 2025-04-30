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
        {/* ─────────────── Back Button ─────────────── */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full shadow hover:bg-gray-50"
        >
          ← Back
        </button>

        <div className="relative flex-1 overflow-y-auto">
          <Mapbox parks={parks} />
          <Search />
          <FilterComponent />
        </div>

        <div className="bg-white border-t z-10">
          <NavigationBar onNavigate={(p) => router.push(p === 'explore' ? '/searchMap' : '/saved_parks')} />
        </div>
      </main>
    </div>
  )
}
