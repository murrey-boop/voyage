'use client';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { travelHistory, TravelHistory as TravelHistoryType } from '@/constants/itinerary';
import Image from 'next/image';

export default function TravelHistorySection() {
  const [history, setHistory] = useState<TravelHistoryType[]>(travelHistory);
  const [photos, setPhotos] = useState<{ [key: string]: string[] }>(
    history.reduce((acc, trip) => ({ ...acc, [trip.id]: trip.photos }), {})
  );

  const handlePhotoUpload = (tripId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => ({
          ...prev,
          [tripId]: [...(prev[tripId] || []), reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRating = (tripId: string, rating: number) => {
    setHistory((prev) =>
      prev.map((trip) => (trip.id === tripId ? { ...trip, rating } : trip))
    );
  };

  const isTripEnded = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 font-montserrat">Travel History</h2>
      {history.map((trip) => (
        <div key={trip.id} className="p-4 mb-4 border rounded-lg">
          <p className="font-lato">Trip: {trip.name}</p>
          <p className="font-lato">Destination: {trip.destination}</p>
          <p className="font-lato">Dates: {trip.dates.start} to {trip.dates.end}</p>
          <div className="mt-2">
            <p className="font-lato mb-1">Rating:</p>
            <Rating
              value={trip.rating}
              onChange={(event, value) => handleRating(trip.id, value || 0)}
              precision={0.5}
            />
          </div>
          <div className="mt-2">
            <p className="font-lato mb-1">Photos:</p>
            <div className="flex space-x-2">
              {photos[trip.id]?.map((photo, index) => (
                <Image key={index} src={photo} alt={`Trip Photo ${index}`} width={100} height={100} className="rounded-lg" />
              ))}
            </div>
            {isTripEnded(trip.dates.end) ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(trip.id, e)}
                className="mt-2"
              />
            ) : (
              <p className="text-gray-500 mt-2 font-lato">Photo upload available after trip ends.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}