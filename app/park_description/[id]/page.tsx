// app/park_description/[id]/page.tsx

import ParkImage from '@/park_description_components/park_image'

interface Park {
  name: string
  description: string
  imageUrl: string
}

// Stubbed data for the parks with your chosen filenames
const parks: Record<string, Park> = {
  'white-rocks-trail': {
    name: 'White Rocks Trail',
    description: 'A scenic hiking trail featuring rocky outcrops and panoramic views.',
    imageUrl: '/img/whiterocks.jpg',
  },
  'hawk-rock-trail': {
    name: 'Hawk Rock Trail',
    description: 'A moderate trail leading up to Hawk Rock overlook above the lake.',
    imageUrl: '/img/hawkrock.jpg',
  },
  'gifford-pinchot-state-park': {
    name: 'Gifford Pinchot State Park',
    description: 'A family-friendly park with camping, boating, and hiking options.',
    imageUrl: '/img/gifford.jpg',
  },
}

export default function ParkDescriptionPage({ params }: { params: { id: string } }) {
  const park = parks[params.id] || {
    name: 'Unknown Park',
    description: 'No description available.',
    imageUrl: '/img/default-park.jpg',
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Hero image */}
      <ParkImage src={park.imageUrl} alt={park.name} />

      {/* Title & description */}
      <h1 className="text-3xl font-bold">{park.name}</h1>
      <p className="text-gray-700">{park.description}</p>
    </main>
  )
}
