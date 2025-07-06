'use client';
import React, { useEffect } from 'react';
import { visaSteps } from '@/components/visa/visaData';
import { gsap } from 'gsap';
import { HiOutlineDocumentText, HiOutlineAdjustmentsHorizontal, HiOutlineCheckBadge } from 'react-icons/hi2';

const stepIcons = [
  <HiOutlineDocumentText className="w-7 h-7" key="doc" />,          
  <HiOutlineAdjustmentsHorizontal className="w-7 h-7" key="process" />,
  <HiOutlineCheckBadge className="w-7 h-7" key="check" />,          
];

export default function HowItWorks() {
  useEffect(() => {
    gsap.fromTo(
      '.howitworks-step',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.howitworks-connector',
      { scaleY: 0, scaleX: 0 },
      { scaleY: 1, scaleX: 1, duration: 0.5, stagger: 0.35, ease: 'power2.out', delay: 0.15 }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      {/* Horizontal row on large screens, vertical on small */}
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-0">
        {visaSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className="
                howitworks-step
                flex flex-col items-center text-center relative
                w-full max-w-xs lg:max-w-[220px] lg:flex-1
              "
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="
                  flex items-center justify-center
                  w-14 h-14 rounded-full bg-blue-600 text-white mb-3
                  shadow-lg border-4 border-white dark:border-gray-800
                ">
                  {stepIcons[index] || stepIcons[0]}
                </div>
                <span className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Step {index + 1}</span>
              </div>
              <div className="px-2">
                <h3 className="text-lg font-semibold mb-1">{step.step}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
            {/* Connector: only on large screens, not after last step */}
            {index < visaSteps.length - 1 && (
              <div
                className="
                  howitworks-connector
                  hidden lg:block
                  h-1 w-16 mx-4 my-0 bg-blue-300 dark:bg-blue-900 rounded-full
                  origin-left
                "
                aria-hidden="true"
              />
            )}
            {/* Mobile vertical connector */}
            {index < visaSteps.length - 1 && (
              <div
                className="
                  howitworks-connector
                  block lg:hidden
                  w-1 h-8 bg-blue-300 dark:bg-blue-900 rounded-full mx-auto
                  origin-top
                "
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}