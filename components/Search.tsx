"use client";

import { BsSearch } from "react-icons/bs";

// Functionality for this to search needs to be added still - needs back end

function Search() {
    return (
        // Outer box
        <div className="flex flex-row items-center gap-4 p-4 bg-white rounded-4xl shadow-md max-w-sm w-full mx-auto fixed left-1/2 transform -translate-x-1/2 top-14 h-[7vh] text-gray-400">
            <BsSearch></BsSearch>
            <input type="search" placeholder="Search" className="w-full rounded-2xl"></input>
        </div>
    );
}

export default Search;