'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary'; 
import { tours } from '@/data/tours';
import { flights } from '@/data/flights';
import { visas } from '@/data/visa';
import TourSection from './tours/TourSection';
import { FlightDeal } from '@/types/flights';

export default function TourCard() {
  return (
    <section className="container mx-auto px-4 py-16 font-inter" role="region" aria-label="Travel deals section">
      <ErrorBoundary fallback={<p className="text-red-500">Failed to load tours.</p>}>
        <Suspense fallback={<p>Loading tours...</p>}>
          <TourSection
            type="tours"
            sectionTitle="Top Tours"
            items={tours}
            seeMoreLink="/tours"
          />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p className="text-red-500">Failed to load flights.</p>}>
        <Suspense fallback={<p>Loading flights...</p>}>
          <TourSection
            type="flights"
            sectionTitle="Top Flights"
            items={flights.map((flight): FlightDeal => ({
              id: String(flight.id),
              title: flight.title,
              description: flight.description,
              price: flight.price,
              origin: flight.route.split(' - ')[0] || flight.route,
              destination: flight.route.split(' - ')[1] || flight.route,
              date: new Date().toISOString().split('T')[0], // Default to today's date
              duration: flight.hours ? `${flight.hours}h` : 'N/A',
              stops: flight.stops || 0,
              airline: 'TBD', // You'll need to add airline data to your flights
              image: flight.image,
              isStudentDeal: false, // Default value
              discountPercentage: undefined
            }))}
            seeMoreLink="/flights"
          />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p className="text-red-500">Failed to load visa promotions.</p>}>
        <Suspense fallback={<p>Loading visas...</p>}>
          <TourSection
            type="visas"
            sectionTitle="Visa Promotions"
            items={visas}
            seeMoreLink="/visa"
          />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}