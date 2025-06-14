'use client'

import { MapPin, Mountain, Star, Calendar, Users } from 'lucide-react'
import { BaseTravelCard } from './base-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TourCardProps {
  tour: {
    id: string
    name: string
    image: string
    rating: number
    reviewsCount: number
    duration: string
    groupSize?: string
    difficulty?: string
    originalPrice?: number
    price: number
  }
}

export const TourSection = ({ tour }: TourCardProps) => (
  <BaseTravelCard
    imageUrl={tour.image}
    altText={`${tour.name} tour destination`}
  >
    <div className="flex items-center gap-2">
      <MapPin className="h-5 w-5 text-blue-500" />
      <h3 className="text-lg font-bold">{tour.name}</h3>
    </div>

    <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span>{tour.rating} ({tour.reviewsCount} reviews)</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>{tour.duration}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span>{tour.groupSize ?? 'Varies'}</span>
      </div>
    </div>

    <div className="flex justify-between items-center pt-2">
      <div>
        {tour.originalPrice && (
          <span className="text-gray-500 dark:text-gray-400 line-through mr-2">
            ${tour.originalPrice}
          </span>
        )}
        <span className="font-bold text-lg">${tour.price}</span>
      </div>
      <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600">
        <Link href={`/tours/${tour.id}`}>Book Now</Link>
      </Button>
    </div>
  </BaseTravelCard>
)