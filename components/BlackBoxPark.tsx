"use client";

function BlackBoxPark() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Leads Into</h2>
            
            <div className="border rounded-lg p-3 bg-gray-800 text-white flex">
              {/* Text Content */}
              <div className="flex-1">
                <div className="text-gray-100 font-medium">
                  Gifford Pinchot State Park
                </div>
                <div className="mt-2">
                  <p className="text-gray-300">Allows for:</p>
                  <ul className="list-disc list-inside mt-1 text-gray-300 space-y-1">
                    <li>Hiking</li>
                    <li>Camp fires in specific areas</li>
                    <li>Camping allowed at sites</li>
                  </ul>
                </div>
              </div>

              {/* Park Image */}
              <div className="ml-4 flex-shrink-0 w-36 h-36">
                <img
                  src="/img/gifford.jpg"
                  alt="Gifford Pinchot State Park"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
        </div>
    );
}

export default BlackBoxPark;