"use client";

import NavigationBar from "@/components/NavigationBar";
import ParkBox from "@/components/ParkBox";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BsArrowLeft,
  BsFillFilterCircleFill,
  BsSearch
} from "react-icons/bs";

interface Park {
  id: string;
  name: string;
  rules: string[];
}

const USER_ID = "dffeaf96-64a3-4bbc-a8d6-c90e89658aca";

export default function SavedParks() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [allParks, setAllParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [campingFilter, setCampingFilter] = useState(false);
  const [cookingFilter, setCookingFilter] = useState(false);

  useEffect(() => {
    const fetchSavedParks = async () => {
      setLoading(true);

      const response = await fetch ("api/saved_parks");
      const data = await response.json()  
      if (!data) {
        console.error("Supabase error");
        setAllParks([]);
      } else {
        const formatted: Park[] = data
          .filter((row: any) => row.park)
          .map((row: any) => ({
            id: row.park.uuid,
            name: row.park.name,
            rules: row.park.rules
              ? Object.entries(row.park.rules).map(([k, v]) => `${k}: ${v}`)
              : [],
          }));
        setAllParks(formatted);
      }

      setLoading(false);
      inputRef.current?.focus();
    };

    fetchSavedParks();
  }, []);

  const parks = useMemo(() => {
    const isAllowed = (val?: string) =>
      val === undefined || !/^no\b/i.test(val);

    return allParks.filter((park) => {
      let campingVal: string | undefined;
      let cookingVal: string | undefined;

      park.rules.forEach((r) => {
        const [k, v] = r.split(":").map((s) => s.trim());
        const keyLower = k.toLowerCase();
        if (campingVal === undefined && keyLower.startsWith("camp")) {
          campingVal = v?.toLowerCase();
        } else if (cookingVal === undefined && keyLower.startsWith("cook")) {
          cookingVal = v?.toLowerCase();
        }
      });

      const passCamping = !campingFilter || isAllowed(campingVal);
      const passCooking = !cookingFilter || isAllowed(cookingVal);
      const passText =
        search === "" ||
        park.name.toLowerCase().includes(search.toLowerCase());

      return passCamping && passCooking && passText;
    });
  }, [allParks, search, campingFilter, cookingFilter]);

  const handleNavigate = (page: string) => {
    if (page === "explore") router.push("/searchMap");
    else if (page === "saved") router.push("/saved_parks");
    else router.push(`/${page}`);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Saved Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh] relative">
        {/* Header */}
        <div className="absolute inset-x-4 top-4 flex items-center gap-3 z-20">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <BsArrowLeft className="text-gray-600" size={18} />
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md w-full">
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
        </div>

        {/* Content */}
        <div className="pt-14 px-4 pb-4">
          <h1 className="text-gray-800 text-lg">Saved Parks</h1>

          <div className="flex flex-col gap-4 overflow-y-auto h-99 mt-2">
            {parks.length === 0 ? (
              <p className="text-center text-gray-500">
                No saved parks found.
              </p>
            ) : (
              parks.map((park) => (
                <ParkBox
                  key={park.id}
                  id={park.id}
                  name={park.name}
                  rules={park.rules}
                />
              ))
            )}
          </div>
        </div>

        {/* Filters */}
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

        {/* Nav bar */}
        <NavigationBar onNavigate={handleNavigate} />
      </main>
    </div>
  );
}
