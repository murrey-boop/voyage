'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookingForm } from '@/components/BookingForm';



  type Tour = {
    id: string;
    name: string;
    description: string;
    price: number;
    title: string;
    image: string;
    rating: number;
    duration: string;
    location: string;
    date: string;
    availableSeats: number;
    guide: string;
    category: string[];
    highlights: string[];
    includes: string[];
    reviewsCount: number;
    // Add other properties as needed
  };
export default function BookTour({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();



  const [tour, setTour] = useState<Tour | null>(null);
  const [loadingTour, setLoadingTour] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in page with callback to the booking page
      router.replace(`/login?callbackUrl=/tours/${params.id}/book`);
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  useEffect(() => {
    async function fetchTour() {
      setLoadingTour(true);
      try {
        const res = await fetch(`/api/tours/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setTour({
            ...data,
            category: Array.isArray(data.category) ? data.category : [data.category ?? ''],
            highlights: data.highlights ?? [],
            includes: data.includes ?? [],
            reviewsCount: data.reviewsCount ?? 0,
          });
        } else {
          setTour(null);
        }
      } catch (error) {
        console.error('Failed to fetch tour:', error);
        setTour(null);
      } finally {
        setLoadingTour(false);
      }
    }
    fetchTour();
  }, [params.id]);

  // Prevent rendering the form until the user state is resolved
  if (!isLoaded || !isSignedIn || loadingTour) {
    return null;
  }

  if (!tour) {
    return <div className="container mx-auto py-8">Tour not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Tour</h1>
      <BookingForm tour={tour} />
    </div>
  );
}