// park_description_components/park_image.tsx
'use client'

import Image from 'next/image'

interface ParkImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
}

export default function ParkImage({
  src,
  alt = 'Park image',
  width,
  height,
}: ParkImageProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 500}
        className="object-cover w-full h-auto"
        priority
      />
    </div>
  )
}
