"use client";

import { BsSearch } from "react-icons/bs";

// Functionality for this to search needs to be added still - needs back end

function Search() {
    return (
        // Outer box
        <div className="flex flex-row items-center gap-4 p-4 bg-white rounded-4xl shadow-md w-full m-auto fixed left-4 top-4 right-4 max-w-11/12">
            <BsSearch></BsSearch>
            <input type="search" placeholder="Search" className="w-full rounded-2xl"></input>
        </div>
    );
}

export default Search;