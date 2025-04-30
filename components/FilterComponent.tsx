"use client";

import { BsFillFilterCircleFill } from "react-icons/bs";

// Functionality for this to actually filter needs to be added still - needs back end

function FilterComponent() {
    return (
        // Outer box
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col p-4 bg-white rounded-2xl shadow-md w-full max-w-fit">
            {/* Title Section */}
            <div className='flex flex-row gap-2 items-center text-gray-500'>
                <BsFillFilterCircleFill></BsFillFilterCircleFill>
                <div className="text-xl text-gray-500">Filters</div>
            </div>
            {/* Filters */}
            <div className='flex flex-row gap-4 ml-6 text-gray-500'>
                <div className='flex flex-row gap-1'>
                    <input type='checkbox'></input>
                    <div>Horse Trail</div>
                </div>
                <div className='flex flex-row gap-1'>
                    <input type='checkbox'></input>
                    <div>Camping</div>
                </div>
                <div className='flex flex-row gap-1'>
                    <input type='checkbox'></input>
                    <div>Hiking</div>
                </div>
            </div>
        </div>
    );
}

export default FilterComponent;