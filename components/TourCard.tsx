'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary'; 
import { tours } from '@/data/tours';
import { flights } from '@/data/flights';
import { visas } from '@/data/visa';
import TourSection from './tours/TourSection';

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
            sectionTitle="Flight Deals"
            items={flights}
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