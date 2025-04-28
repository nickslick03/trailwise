"use client";

import Head from "next/head";
import Search from "@/components/Search";
import FilterComponent from "@/components/FilterComponent";
import BlackBoxPark from "@/components/BlackBoxPark";
//import NavigationBar from "@/components/NavigationBar";

export default function SearchMap() {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
            <Head>
                <title>Search Parks</title>
            </Head>

            <main className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden h-[90vh]">
                <div className="p-4">

                    <div className="h-10">
                        <Search />
                    </div>

                    <br/>
                    <h1 className="text-gray-800 text-lg">Saved Parks</h1>

                    {/* Scrollable BlackBox content area */}
                    <div className="flex-1 overflow-y-auto h-93">
                        <BlackBoxPark />
                        <BlackBoxPark />
                        <BlackBoxPark />
                        {/* Add more BlackBoxPark components as needed */}
                    </div>
                    
                    {/* Filter Component */}
                    <div className="sticky bottom-0 bg-white border-t">
                        <FilterComponent />
                    </div>
                    {/* <NavigationBar /> */}
                </div>
            </main>
        </div>
    )
}