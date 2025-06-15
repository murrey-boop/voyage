'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function TourServices() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -20,
        rotationX: 15,
        rotationY: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(imageRef.current, {
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-montserrat">
            Voyage Tour Services
          </h2>
          <p className="text-lg font-lato mb-6">
            At Digital Voyaging, we offer tailored travel plans, 
            expert guides, and unforgettable experiences. 
            Whether you&apos;re seeking adventure, culture, or relaxation,
             our team ensures every detail is perfect for your dream holiday.
          </p>
          <Link
            href="/tours/plan-holiday"
            className="flex bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 items-center space-x-2"
          >
            <span>Plan Your Holiday</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div
            ref={imageRef}
            className="relative w-64 h-64 bg-teal-500/20 rounded-lg overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            <Image
              src="/images/globe.jpg"
              alt="Globe 3D"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))' }}
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </section>
    );
  }
