"use client";

import { useState } from 'react';
import Head from 'next/head';
import BlackBoxPark from "@/components/BlackBoxPark";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdNotInterested } from "react-icons/md";
import NavigationBar from '@/components/NavigationBar';
import { useRouter } from "next/navigation";

export default function ParkDescriptionPage() {
  const [expandedRules, setExpandedRules] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const toggleRules = () => setExpandedRules(!expandedRules);
  const toggleDescription = () => setExpandedDescription(!expandedDescription);
  const toggleSources = () => setShowSources(!showSources);

  const router = useRouter();
  const handleNavigate = (page: string) => {
    if (page === "explore") router.push("/searchMap");
    else if (page === "saved") router.push("/saved_parks");
    else router.push(`/${page}`);
  };
  return (
    <div className="relative min-h-screen bg-gray-50 p-4">
      <Head>
        <title>whiterocks</title>
      </Head>

      {/* Sources Popup */}
      {showSources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Black overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-70"
            style={{
              width: 'calc(100vw - 2rem)',
              maxWidth: '29rem', 
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            onClick={toggleSources}
          ></div>
          
          {/* Popup content */}
          <div 
            className="relative bg-white rounded-lg p-6 max-w-md mx-auto"
            style={{
              maxWidth: 'calc(100% - 2rem)'
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">Information Sources</h3>
              <button 
                onClick={toggleSources}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">Trail information sourced from:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>National Park Service Official Website</li>
                <li>Local Hiking Association Reports (2023)</li>
                <li>US Forest Service Trail Maps</li>
                <li>Park Ranger Interviews</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: June 2023
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden h-[95vh] flex flex-col">
        <div className={` ${showSources ? 'backdrop-blur-sm backdrop-brightness-90' : ''}`}>
          {/* Header Image */}
          <div className="relative h-36 w-full overflow-hidden bg-gray-700">
            <img 
              src="/img/whiterocks.jpg" 
              alt="whiterocks"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sources Clickable section */}
          <div className="p-4 border-b cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
            whiterocks
              <span onClick={toggleSources} className="text-blue-500 text-sm hover:underline cursor-pointer">View Sources</span>
            </h2>
          </div>

          {/* Rules section */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Rules</h2>
              <button 
                onClick={toggleRules}
                className="text-blue-500 text-sm hover:underline"
              >
                {expandedRules ? 'Show Less' : 'See More...'}
              </button>
            </div>

          {/* List of Rules */}
            <ul className="mt-2 space-y-2">
              <li className="flex items-center mt-2 text-gray-600">
                <FaRegCheckCircle className="text-green-500"/>
                <label htmlFor="hiking">Allows hiking</label>
              </li>
              <li className="flex items-center mt-2 text-gray-400">
                <MdNotInterested className="text-red-500"/>
                <label htmlFor="camping">Does not allow overnight camping</label>
              </li>
            </ul>

            {expandedRules && (
              <div className="mt-2 text-gray-600">
                <p>Additional rules information would be displayed here when expanded.</p>
              </div>
            )}
          </div>

          {/* Description section */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Description</h2>
              <button 
                onClick={toggleDescription}
                className="text-blue-500 text-sm hover:underline"
              >
                {expandedDescription ? 'Show Less' : 'See More...'}
              </button>
            </div>

            <p className="mt-2 text-gray-600">
              This trail climbs steadily up to the top of the mountain, then heads out along the mountain Ridgeline until it...
            </p>

            {expandedDescription && (
              <div className="mt-2 text-gray-600">
                <p>More detailed description of the trail would appear here when expanded.</p>
              </div>
            )}
          </div>

          {/* Leads Into section */}
          <div className ="overflow-y-auto h-70">
          <BlackBoxPark />
          <BlackBoxPark />
          </div>
          {/* ───────── nav bar ───────── */}
          <div className="z-10"> 
        <NavigationBar onNavigate={handleNavigate}
           /></div>
        </div>
      </main>
    </div>
  )
}