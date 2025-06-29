'use client';
import React, { useEffect, useRef } from 'react';
import { FileText, CheckSquare, Clock } from 'lucide-react';
import { visaServices } from '@/components/visa/visaData';
import { gsap } from 'gsap';

const icons = {
  FileText: <FileText className="h-10 w-10 text-blue-700 dark:text-blue-300" />,
  CheckSquare: <CheckSquare className="h-10 w-10 text-green-700 dark:text-green-300" />,
  Clock: <Clock className="h-10 w-10 text-orange-500 dark:text-orange-300" />,
};

export default function VisaServices() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Fade-in for heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
    // Fade-in for cards
    gsap.fromTo(
      '.visa-service-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  // Border size for both horizontal and vertical (e.g., 7px thick, 48px long)
  const borderLength = 'h-12 w-[7px]'; // 48px height, 7px width

  return (
    <section
      className="relative container mx-auto px-4 py-20"
      aria-label="Visa Services"
      role="region"
    >
      {/* Subtle background gradient/pattern for visual separation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/80 via-white/90 to-blue-100/60 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800" />
      {/* Optional section divider */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-1 rounded-b bg-blue-600/40 dark:bg-blue-400/40" />

      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-200"
      >
        Our Visa Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 md:gap-y-8">
        {visaServices.map((service, index) => (
          <div
            key={index}
            className="group visa-service-card relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition duration-200 transform hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400 border border-gray-100 dark:border-gray-700 overflow-hidden"
            tabIndex={0}
          >
            {/* Gradient Borders on hover: Top-left and Bottom-right (both vertical and horizontal, same size) */}
            <div
              className="pointer-events-none absolute z-10 top-0 left-0 w-full h-full rounded-2xl transition-opacity duration-300"
              aria-hidden="true"
            >
              {/* Top-left: vertical */}
              <span
                className={`
                  absolute left-0 top-0
                  h-12 w-[7px]
                  bg-gradient-to-b from-blue-600 to-yellow-400
                  rounded-tl-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `}
              />
              {/* Top-left: horizontal, same size as vertical but rotated */}
              <span
                className={`
                  absolute left-0 top-0
                  w-12 h-[7px]
                  bg-gradient-to-r from-blue-600 to-yellow-400
                  rounded-tl-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `}
              />
              {/* Bottom-right: vertical */}
              <span
                className={`
                  absolute right-0 bottom-0
                  h-12 w-[7px]
                  bg-gradient-to-t from-blue-600 to-yellow-400
                  rounded-br-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `}
              />
              {/* Bottom-right: horizontal, same size as vertical but rotated */}
              <span
                className={`
                  absolute right-0 bottom-0
                  w-12 h-[7px]
                  bg-gradient-to-l from-blue-600 to-yellow-400
                  rounded-br-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `}
              />
            </div>
            <div className="mb-5 flex justify-center">{icons[service.icon as keyof typeof icons]}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-200">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}