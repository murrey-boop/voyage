'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    people: 1,
    fullName: '',
    email: '',
    phone: '',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting booking:', formData);
    alert('Booking submitted (not yet connected to database)');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold">Trip Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="people">Number of People</Label>
              <Input
                type="number"
                id="people"
                name="people"
                min={1}
                value={formData.people}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold">Personal Info</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold">Confirm Booking</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Destination:</strong> {formData.destination}</p>
            <p><strong>Dates:</strong> {formData.startDate} to {formData.endDate}</p>
            <p><strong>People:</strong> {formData.people}</p>
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
        </>
      )}

      <div className="flex gap-4 pt-6">
        {step > 1 && <Button type="button" variant="outline" onClick={prevStep}>Back</Button>}
        {step < 3 && <Button type="button" onClick={nextStep}>Next</Button>}
        {step === 3 && <Button type="submit">Submit</Button>}
      </div>
    </form>
  );
}
