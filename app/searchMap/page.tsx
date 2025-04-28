"use client";

import Head from "next/head";
import Search from "@/components/Search";
import Mapbox from "@/components/Mapbox";
import FilterComponent from "@/components/FilterComponent";
//import NavigationBar from "@/components/NavigationBar";

export default function SearchMap() {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
            <Head>
                <title>Search Parks</title>
            </Head>

            <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh]">
                <Mapbox parks={[]} />
                <Search />
                <FilterComponent />
                {/* <NavigationBar /> */}
                
            </main>
        </div>
    )

}