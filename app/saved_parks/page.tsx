"use client";

import FilterComponent from "@/components/FilterComponent";
import NavigationBar from "@/components/NavigationBar";
import ParkBox from "@/components/ParkBox";
import Search from "@/components/Search";
import { supabase } from "@/supabaseClient";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Park {
  id: string;
  name: string;
  rules: string[];
}

export default function Saved_Parks() {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const onNavigate = (page: string) => {
    if (page === "explore") {
      router.push("/searchMap");
    } else if (page === "saved") {
      router.push("/saved_parks");
    }
  };

  const userId = "dffeaf96-64a3-4bbc-a8d6-c90e89658aca"; // hardcoded user

  useEffect(() => {
    const fetchSavedParks = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("saved_park")
        .select(`
          park:park (
            park,
            name,
            rules
          )
        `)
        .eq("user", userId);

      console.log("Fetched saved park data:", data);
      console.log("Fetch error:", error);

      if (error || !data) {
        setParks([]);
      } else {
        const formatted = data
          .filter((item: any) => item.park !== null)
          .map((item: any) => ({
            id: item.park.uuid,
            name: item.park.name,
            rules: item.park.rules
              ? Object.entries(item.park.rules).map(
                  ([key, val]) => `${key}: ${val}`
                )
              : [],
          }));

        setParks(formatted);
      }

      setLoading(false);
    };

    fetchSavedParks();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Saved Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh]">
        <div className="p-4 pb-4">
          <div className="h-10">
            <Search />
          </div>

          <br />
          <h1 className="text-gray-800 text-lg">Saved Parks</h1>

          <div className="flex-1 overflow-y-auto h-93 space-y-4 mt-2">
            {parks.length === 0 ? (
              <p className="text-center text-gray-500">No saved parks found.</p>
            ) : (
              parks.map((park) => (
                <ParkBox key={park.id} id={park.id} name={park.name} rules={park.rules} />
              ))
            )}
          </div>
        </div>

        <div className="bottom-0 bg-white border-t z-10">
          <div className="flex flex-col">
            <FilterComponent />
            <NavigationBar onNavigate={onNavigate} />
          </div>
        </div>
      </main>
    </div>
  );
}
