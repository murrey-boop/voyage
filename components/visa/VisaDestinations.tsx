'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { visaDestinations } from '@/components/visa/visaData';
import { gsap } from 'gsap';

export default function VisaDestinations() {
  useEffect(() => {
    gsap.fromTo(
      '.visa-destination-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Visa Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visaDestinations.map((destination, index) => (
          <div
            key={index}
            className="visa-destination-card destination-card bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <Image
                src={destination.flag}
                alt={`${destination.country} flag`}
                width={40}
                height={40}
                className="mr-4"
              />
              <h3 className="text-xl font-semibold">{destination.country}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Processing Time:</strong> {destination.processingTime}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Requirements:</strong> {destination.requirements}
            </p>
            <Button className='apply-btn' variant="link" asChild>
              <a href='/visa/apply'>Apply Now</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}