'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookingCalendar } from '@/components/BookingCalendar';
import { createBooking } from '@/lib/createBooking';

import type { Tour } from '@/types/tours';

export function BookingForm({ tour }: { tour: Tour }) {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !session) return;

    setIsSubmitting(true);
    try {
      await createBooking({
        tourId: tour.id,
        userId: session.user?.id ?? '',
        startDate: date,
        endDate: addDays(date, tour.durationDays || 1),
        guests,
      });
      // Show success message
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg">
      <h3 className="text-xl font-bold">Book This Tour</h3>
      
      <BookingCalendar
        availability={
          Array.isArray(tour.availability)
            ? tour.availability
            : Object.entries(tour.availability || {}).map(([date, info]) => ({
                startDate: new Date(date),
                endDate: new Date(date), // Adjust if you have endDate info
                maxPeople: 10, // Default value since info.maxPeople does not exist
                bookedSlots: 0, // Default value since bookedSlots does not exist
                available: info.available,
                price: info.price,
              }))
        }
        onDateSelect={setDate}
      />

      <div>
        <label htmlFor="guests" className="block mb-2 font-medium">
          Number of Guests
        </label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>

      <Button 
        type="submit" 
        disabled={!date || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Booking...' : 'Confirm Booking'}
      </Button>

      {date && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-bold">Booking Summary</h4>
          <p>Date: {date?.toLocaleDateString()}</p>
          <p>Guests: {guests}</p>
          <p className="font-bold mt-2">
            Total: ${tour.price * guests}
          </p>
        </div>
      )}
    </form>
  );
}



function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
