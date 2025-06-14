'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const TourCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    <div className="relative h-64 w-full">
      <Skeleton className="h-full w-full rounded-t-xl" />
    </div>
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4 rounded" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
)

export const TourSectionSkeleton = () => (
  <div className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <Skeleton className="h-9 w-64 rounded" />
      <Skeleton className="h-10 w-48 rounded-md" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  </div>
)