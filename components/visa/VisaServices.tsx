'use client';
import React, { useEffect } from 'react';
import { FileText, CheckSquare, Clock } from 'lucide-react';
import { visaServices } from '@/components/visa/visaData';
import { gsap } from 'gsap';

const icons = {
  FileText: <FileText className="h-8 w-8 text-primary" />,
  CheckSquare: <CheckSquare className="h-8 w-8 text-primary" />,
  Clock: <Clock className="h-8 w-8 text-primary" />,
};

export default function VisaServices() {
  useEffect(() => {
    gsap.fromTo(
      '.visa-service-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Visa Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visaServices.map((service, index) => (
          <div
            key={index}
            className="visa-service-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <div className="mb-4">{icons[service.icon as keyof typeof icons]}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}