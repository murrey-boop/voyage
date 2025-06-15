'use client';
import React, { useEffect } from 'react';
import { visaSteps } from '@/components/visa/visaData';
import { gsap } from 'gsap';

export default function HowItWorks() {
  useEffect(() => {
    gsap.fromTo(
      '.visa-step',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="space-y-8">
        {visaSteps.map((step, index) => (
          <div key={index} className="visa-step flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}