'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function AboutUs() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.from(h1Ref.current, { opacity: 0, y: 20, duration: 1, ease: 'power3.out' });
    gsap.from(pRef.current, { opacity: 0, y: 20, duration: 1, delay: 0.3, ease: 'power3.out' });
  }, []);

  const quickLinks = [
    { href: '/itinerary', label: 'Itinerary' },
    { href: '/visa', label: 'Visa' },
    { href: '/tours', label: 'Tours' },
    { href: '/flights', label: 'Flights' },
  ];

  return (
    <section className="py-16 bg-teal-50 z-20"> {/* Increased z-index */}
      <div className="container mx-auto px-4 text-center">
        <h2
          ref={h1Ref}
          className="text-2xl sm:text-3xl font-bold mb-6 font-montserrat"
        >
          About Us
        </h2>
        <p
          ref={pRef}
          className="text-gray-600 mb-8 max-w-2xl mx-auto font-lato text-sm sm:text-base"
        >
          Digital Voyaging is your trusted travel partner, 
          offering seamless booking experiences for flights, 
          tours, and visas. We’re here to help you explore 
          the world with ease and affordability.
        </p>
        <div className="flex justify-center space-x-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-teal-500 text-white font-semibold px-3 py-1 rounded-full text-sm transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}