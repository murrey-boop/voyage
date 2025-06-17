'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { tours } from '@/components';


// Schema for booking form validation

const bookingSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  destination: z.string().min(1, 'Destination required'),
  guests: z.coerce.number().min(1, 'At least 1 guest'),
  checkIn: z.string(),
  checkOut: z.string(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { data: session } = useSession();
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      destination: '',
      guests: 1,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    toast.success('Booking submitted!');
    console.log({ ...data });
    // Later: Save to database
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10 rounded-xl shadow-xl bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Book Your Tour</h2>
      <form
        onSubmit={handleSubmit((formData) => {
          const startDate = dateRange[0].startDate;
          const endDate = dateRange[0].endDate;
          formData.checkIn = startDate ? format(startDate, 'yyyy-MM-dd') : '';
          formData.checkOut = endDate ? format(endDate, 'yyyy-MM-dd') : '';
          onSubmit(formData);
        })}
        className="space-y-5"
      >
        <div>
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <Input
            className="mt-1"
            placeholder="Full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <Input
            className="mt-1"
            placeholder="Email address"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Destination
          </label>
          <select
            {...register('destination')}
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a destination</option>
            {tours.topTours.map((tour) => (
              <option key={tour.id} value={tour.title}>
                {tour.title}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p className="text-sm text-red-500">{errors.destination.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Guests</label>
          <Input
            type="number"
            min={1}
            className="mt-1"
            {...register('guests')}
          />
          {errors.guests && (
            <p className="text-sm text-red-500">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Select Dates
          </label>
          <div className="mt-2 border rounded-lg overflow-hidden">
            <DateRange
              ranges={dateRange}
              onChange={(item) => setDateRange([item.selection])}
              rangeColors={['#2563eb']}
              minDate={new Date()}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow"
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
}
