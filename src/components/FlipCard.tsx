'use client'

import { useState } from 'react'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export default function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`perspective-1000 cursor-pointer h-full ${className}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative transform-style-3d transition-transform duration-500 h-full ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  )
}
