"use client";

import { useState } from "react";
import Head from "next/head";
import BlackBoxPark       from "@/components/BlackBoxPark";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdNotInterested }  from "react-icons/md";
import NavigationBar      from "@/components/NavigationBar";
import { useRouter }      from "next/navigation";
import { IoIosBookmark }  from "react-icons/io";
import { BsArrowLeft }    from "react-icons/bs";

/* -------- Placeholder data  (URL → park name mapping would come from DB) --- */
let parkURL  = window.location.href;
let parkName = "White Rocks Trail";

/* ========================================================================= */
export default function ParkDescriptionPage() {
  /* -------------- Local UI state -------------- */
  const [expandedRules,       setExpandedRules]       = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showSources,         setShowSources]         = useState(false);

  /* -------------- Simple togglers -------------- */
  const toggleRules        = () => setExpandedRules(!expandedRules);
  const toggleDescription  = () => setExpandedDescription(!expandedDescription);
  const toggleSources      = () => setShowSources(!showSources);

  /* -------------- Bookmark logic (stub) -------- */
  const savePark = () => {
    // TODO: hit API / Supabase function to save this park for the logged-in user
  };

  /* -------------- Routing helpers -------------- */
  const router = useRouter();

  /* Bottom nav - reuse NavigationBar’s callback signature */
  const handleNavigate = (page: string) => {
    if      (page === "explore") router.push("/searchMap");
    else if (page === "saved")   router.push("/saved_parks");
    else                         router.push(`/${page}`);
  };

  /* =======================  RENDER  ======================= */
  return (
    <div className="relative min-h-screen bg-gray-50 p-4">
      {/* ------------- SEO / tab title ------------- */}
      <Head>
        <title>{parkName}</title>
      </Head>

      {/* ─────────────  Pop-up with information sources  ───────────── */}
      {showSources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark translucent overlay; click to close */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            style={{
              width: "calc(100vw - 2rem)",
              maxWidth: "29rem",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={toggleSources}
          />

          {/* White modal card */}
          <div
            className="relative bg-white rounded-lg p-6 max-w-md mx-auto"
            style={{ maxWidth: "calc(100% - 2rem)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">
                Information Sources
              </h3>
              <button
                onClick={toggleSources}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Static list; replace with real citations if available */}
            <div className="space-y-3">
              <p className="text-gray-700">Trail information sourced from:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>National Park Service – official website</li>
                <li>Local Hiking Association reports (2023)</li>
                <li>US Forest Service trail maps</li>
                <li>Interviews with park rangers</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: June 2023
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────  Main mobile card  ───────────── */}
      <main className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden h-[95vh] flex flex-col">
        {/* Add a frosted-glass effect to the card when the pop-up is open */}
        <div
          className={
            showSources ? "backdrop-blur-sm backdrop-brightness-90" : ""
          }
        >
          {/* ───────────  Header image / buttons  ─────────── */}
          <div className="relative h-36 w-full overflow-hidden bg-gray-700">
            {/* ← Back button (same style as on /saved_parks) */}
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md flex items-center justify-center"
            >
              <BsArrowLeft className="text-gray-600" size={18} />
            </button>

            {/* Save / bookmark button (right) */}
            <button
              onClick={savePark}
              className="flex items-center justify-center absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
            >
              <IoIosBookmark size={20} className="text-gray-700" />
            </button>

            {/* Hero image */}
            <img
              src="/img/whiterocks.jpg"
              alt={parkName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ───────────  Park title + view sources link  ─────────── */}
          <div className="p-4 border-b cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
              {parkName}
              <span
                onClick={toggleSources}
                className="text-blue-500 text-sm hover:underline"
              >
                View Sources
              </span>
            </h2>
          </div>

          {/* ───────────  Rules section  ─────────── */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Rules</h2>
              <button
                onClick={toggleRules}
                className="text-blue-500 text-sm hover:underline"
              >
                {expandedRules ? "Show Less" : "See More..."}
              </button>
            </div>

            {/* Minimal demo rules list */}
            <ul className="mt-2 space-y-2">
              <li className="flex items-center mt-2 text-gray-600">
                <FaRegCheckCircle className="text-green-500" />
                <span className="ml-2">Allows hiking</span>
              </li>
              <li className="flex items-center mt-2 text-gray-400">
                <MdNotInterested className="text-red-500" />
                <span className="ml-2">Does not allow overnight camping</span>
              </li>
            </ul>

            {expandedRules && (
              <p className="mt-2 text-gray-600">
                Additional rules information would be displayed here when
                expanded.
              </p>
            )}
          </div>

          {/* ───────────  Description section  ─────────── */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Description
              </h2>
              <button
                onClick={toggleDescription}
                className="text-blue-500 text-sm hover:underline"
              >
                {expandedDescription ? "Show Less" : "See More..."}
              </button>
            </div>

            <p className="mt-2 text-gray-600">
              This trail climbs steadily up to the top of the mountain, then
              heads out along the mountain ridgeline until it…
            </p>

            {expandedDescription && (
              <p className="mt-2 text-gray-600">
                More detailed description of the trail would appear here when
                expanded.
              </p>
            )}
          </div>

          {/* ───────────  Leads-into section  ─────────── */}
          {/* 2× <BlackBoxPark /> are hard-coded for mock-up; render real data later */}
          <div className="overflow-y-auto h-70">
            <BlackBoxPark />
            <BlackBoxPark />
          </div>

          {/* ───────────  Bottom navigation bar  ─────────── */}
          <div className="z-10">
            <NavigationBar onNavigate={handleNavigate} />
          </div>
        </div>
      </main>
    </div>
  );
}
