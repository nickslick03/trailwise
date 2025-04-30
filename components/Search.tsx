// components/Search.tsx
'use client'

import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'

interface SearchProps {
  value?: string
  onChange?: (term: string) => void
}

export default function Search({ value, onChange }: SearchProps) {
  const router = useRouter()

  return (
    <div className="absolute top-4 left-4 right-4 flex items-center gap-4 z-30">
      {/* Back button container */}
      <div className="bg-white border border-gray-200 rounded-full p-2 shadow-md">
        <button onClick={() => router.back()} className="flex items-center justify-center">
          <IoMdArrowBack size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Search bar container (fills remaining space) */}
      <div
        className="
          flex items-center gap-2 px-4 py-2 bg-white
          border border-gray-200 rounded-full shadow-md
          flex-1
        "
      >
        <BsSearch className="text-gray-400" size={18} />
        <input
          type="search"
          placeholder="Search parks"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 outline-none text-gray-700"
        />
      </div>
    </div>
  )
}
