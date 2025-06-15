'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { tours}  from "@/components/index"; 

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  destination: z.string().min(1, "Destination is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().min(1, "Return date is required"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-12 space-y-6 p-6 bg-white dark:bg-gray-900 rounded shadow"
    >
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <Input {...register("name")}
          placeholder="John Doe" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input type="email" {...register("email")} placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Destination</label>
        <Select onValueChange={(val) => setValue("destination", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a tour" />
          </SelectTrigger>
          <SelectContent>
            {tours.topTours.map((tour) => (
              <SelectItem key={tour.id} value={tour.title}>
                {tour.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Departure Date</label>
        <Input type="date" {...register("departureDate")} />
        {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Return Date</label>
        <Input type="date" {...register("returnDate")} />
        {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Submit Booking
      </Button>
    </form>
  );
}
