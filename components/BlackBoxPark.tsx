"use client";

function BlackBoxPark() {
    return (
        <div className="p-4">
            <div className="border rounded-lg p-3 bg-gray-800 text-white flex">
              {/* Text Content */}
              <div className="flex-1">
                <div className="text-gray-100 font-medium">
                  Gifford Pinchot State Park
                </div>
                <div className="mt-2 text-sm">
                  <p className="text-gray-300">Allows for:</p>
                  <ul className="list-disc list-inside mt-1 text-gray-300">
                    <li>Hiking</li>
                    <li>Camp fires in specific areas</li>
                    <li>Camping allowed at sites</li>
                  </ul>
                </div>
              </div>

              {/* Park Image */}
              <div className="ml-4 flex-shrink-0 w-28 h-28">
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