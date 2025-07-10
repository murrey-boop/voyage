'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookingForm } from '@/components/BookingForm';

export default function BookTour({ params }: { params: { id: string } }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in page with callback to the booking page
      router.replace(`/login?callbackUrl=/tours/${params.id}/book`);
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  // Prevent rendering the form until the user state is resolved
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Tour</h1>
      {/* You need to fetch the tour object here; this is a placeholder example */}
      {/* Replace the following line with actual fetching logic */}
      <BookingForm tour={{ id: params.id, userId: user.id }} />
    </div>
  );
}