// app/searchMap/page.tsx
'use client'

import Head from 'next/head'
import Mapbox from '@/components/Mapbox'
import NavigationBar from '@/components/NavigationBar'
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { Park } from '@/types/park'
import {
  BsSearch,
  BsFillFilterCircleFill,
} from "react-icons/bs";

export default function SearchMap() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  const [allParks, setAllParks] = useState<Park[]>([])
  const [parks, setParks] = useState<Park[]>([])
  const [search, setSearch]       = useState("");
  const [campingFilter, setCampingFilter] = useState(false);
  const [cookingFilter, setCookingFilter] = useState(false);

  useEffect(() => {
    fetch('/api/parkLocations')
      .then((res) => res.json())
      .then((data: Park[]) => {
        setAllParks(data)
        setParks(data)})
      .catch(console.error)
    inputRef.current?.focus();
  }, [])

  /* ------------ derived list ------------ */
  useMemo(() => {
    console.log('here')
    // helper — true if value missing OR doesn’t start with “no”
    const isAllowed = (val?: string) =>
      val === undefined || !/^no\b/i.test(val);

    const filteredParks = allParks.filter((park) => {
      // extract the first value for keys that start with “camp” / “cook”
      let campingVal: string | undefined;
      let cookingVal: string | undefined;

      Object.entries(park.rules).forEach((r) => {
          if (campingVal === undefined && r[0].startsWith("camp")) {
            campingVal = r[1].toLowerCase();
          } else if (cookingVal === undefined && r[0].startsWith("cook")) {
            cookingVal = r[1].toLowerCase();
          }
      });

      const passCamping =
        !campingFilter || isAllowed(campingVal);

      const passCooking =
        !cookingFilter || isAllowed(cookingVal);

      const passText =
        search === "" ||
        park.name.toLowerCase().includes(search.toLowerCase());

      console.log(passCamping && passCooking && passText)

      return passCamping && passCooking && passText;
    });
    console.log(filteredParks)
    setParks(filteredParks)
  }, [search, campingFilter, cookingFilter]);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Search Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh] flex flex-col">
        <div className="fixed box-border z-2 flex items-center self-center-safe m-5 gap-2 px-4 py-2 bg-white rounded-full shadow-md w-full max-w-sm">
            <BsSearch className="text-gray-400" size={18} />
            <input
              ref={inputRef}
              id="search"
              type="search"
              placeholder="Search parks"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900"
            />
          </div>
        {/* everything else stays the same—no standalone back button */}
        <div className="relative flex-1 overflow-y-auto">
          <Mapbox parks={parks} />
          {/* ───────── filters panel ───────── */}
          <div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 translate-y-2
                        bg-white shadow-md rounded-2xl px-6 py-3 w-fit
                        flex items-center gap-6 z-30"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <BsFillFilterCircleFill />
              <span className="text-lg">Filters</span>
            </div>
  
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={campingFilter}
                onChange={() => setCampingFilter((v) => !v)}
              />
              Camping
            </label>
  
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cookingFilter}
                onChange={() => setCookingFilter((v) => !v)}
              />
              Cooking
            </label>
          </div>
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