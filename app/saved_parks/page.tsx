"use client";

import NavigationBar from "@/components/NavigationBar";
import ParkBox from "@/components/ParkBox";
import { supabase } from "@/supabaseClient";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BsFillFilterCircleFill } from "react-icons/bs";

interface Park {
  id: string;
  name: string;
  rules: string[];
}

export default function Saved_Parks() {
  const [allParks, setUnfilteredParks] = useState<Park[]>([]);
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSearchValue, setSearchVal] = useState<string>("")
  const [campingFilter, setCampFilter] = useState<boolean>(false)
  const [cookingFilter, setCookFilter] = useState<boolean>(false)

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

        setUnfilteredParks(formatted)
        setParks(formatted);
      }

      setLoading(false);
      setSearchVal(checkInput(undefined))
      document.getElementById("search")?.focus()
    };

    fetchSavedParks();
  }, [currentSearchValue]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;


  let searchPhrase = ""

  // These two functions can be put together pretty easily. If we have time, I'll do that to save space
  function checkInput(e: any) {
      // Get the new added letter
      let letter
      searchPhrase = currentSearchValue
      if(e != undefined){
          letter = e.nativeEvent.data
          // Add or remove from the string (if new letter or backspace)
          if(letter != null){
              searchPhrase += letter
          }else{
              searchPhrase = searchPhrase.slice(0, -1)
          }
      }

      // Filters
      // Some very gross mapping, because the database wasn't set up well for the filters.
      // Essentially, I'm keeping only the relevant rules, removing the label at the beginning, and then seeing if the string begins with no
      const parkRuleFilter = allParks.map(park => [park.rules[1].split(":")[1].substring(0, 3), park.rules[2].split(":")[1].substring(0, 3)])
      const filteredParks = allParks.filter((park, index) => {
        let pass = false
        if(campingFilter){
          if(parkRuleFilter[index][0].trim() !== "No") pass = true
        }
        if(cookingFilter){
          if(campingFilter && pass) pass = parkRuleFilter[index][1].trim() !== "No" ? true : false
        }
        if(!cookingFilter && !campingFilter) pass = true
        return pass;
      });
      const searchedParks = filteredParks.filter((item) => searchPhrase == "" || item.name.toLowerCase().includes(searchPhrase.toLowerCase()))
      setSearchVal(searchPhrase)
      setParks(searchedParks)

      return searchPhrase
  }

  function modifyCheckbox(e: any) {
      // Switch the current filter boolean depending on which box was clicked - update with state change
      // Switch what boolean is being used to evaluate, since for some reason setting the new value doesn't happen until later
      // Whatever is being sent will be flipped
      const id = e.nativeEvent.srcElement.id
      let camping = campingFilter
      let cooking = cookingFilter
      if(id == "camping"){
        camping = !campingFilter
        setCampFilter(!campingFilter)
      }else {
        cooking = !cookingFilter
        setCookFilter(!cookingFilter)
      }

      // Filters
      // Some very gross mapping, because the database wasn't set up well for the filters.
      // Essentially, I'm keeping only the relevant rules, removing the label at the beginning, and then seeing if the string begins with no
      const parkRuleFilter = allParks.map(park => [park.rules[1].split(":")[1].substring(0, 3), park.rules[2].split(":")[1].substring(0, 3)])
      const filteredParks = allParks.filter((park, index) => {
        let pass = false
        if(camping){
          if(parkRuleFilter[index][0].trim() !== "No") pass = true
        }
        if(cooking){
          if(camping && pass) pass = parkRuleFilter[index][1].trim() !== "No" ? true : false
        }
        if(!cooking && !camping) pass = true
        return pass;
      });

      // Check if there's a search
      const searchedParks = filteredParks.filter((item) => currentSearchValue == "" || item.name.toLowerCase().includes(currentSearchValue.toLowerCase()))

      setParks(searchedParks)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <Head>
        <title>Saved Parks</title>
      </Head>

      <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh]">
        <div className="p-4 pb-4">
          <div className="h-10">
            {/* Search Component */}
            <div className="flex flex-row items-center gap-4 p-4 bg-white rounded-4xl shadow-md max-w-sm w-full mx-auto fixed left-1/2 transform -translate-x-1/2 top-14 h-[7vh] text-gray-400">
                <BsSearch></BsSearch>
                <input id="search" type="search" placeholder="Search" value={currentSearchValue} className="w-full rounded-2xl" onChange={checkInput}></input>
            </div>
            {/* Search Component */}
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
            {/* Filter Component */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col p-4 bg-white rounded-2xl shadow-md w-full max-w-fit">
                {/* Title Section */}
                <div className='flex flex-row gap-2 items-center text-gray-500'>
                    <BsFillFilterCircleFill></BsFillFilterCircleFill>
                    <div className="text-xl text-gray-500">Filters</div>
                </div>
                {/* Filters */}
                <div className='flex flex-row gap-4 ml-6 text-gray-500'>
                    <div className='flex flex-row gap-1'>
                        <input id="camping" type='checkbox' checked={campingFilter} onChange={modifyCheckbox}></input>
                        <div>Camping</div>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <input id="cooking" type='checkbox' checked={cookingFilter} onChange={modifyCheckbox}></input>
                        <div>Cooking</div>
                    </div>
                </div>
            </div>
            {/* Filter Component */}
            <NavigationBar onNavigate={onNavigate} />
          </div>
        </div>
      </main>
    </div>
  );
}
