import React from 'react';
import type { Metadata } from 'next';
import Stepper from './Stepper';

export const metadata: Metadata = {
  title: 'Fast Visa Processing | Digital Voyaging',
  description: 'Begin your visa application with Digital Voyaging Travel Agency.',
  openGraph: {
    title: 'Fast Visa Processing |  Digital Voyaging',
    description: 'Begin your visa application with Digital Voyaging Travel Agency.',
    url: 'https://digitalvoyaging.com/visa/apply',
    siteName: 'Digital Voyaging',
    images: [
      {
        url: 'https://digitalvoyaging.com/images/visa-application.jpg',
        width: 1200,
        height: 630,
        alt: 'Visa Application Image',
      },
    ],
    locale: 'en_US',
  },
};

export default function ApplyVisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-orange-50 overflow-x-hidden">
      {/* SVG Wave Background - Top */}
      <div className="absolute top-0 left-0 w-full h-[140px] pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#fb923c"
            fillOpacity="0.17"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,218.7C840,213,960,171,1080,138.7C1200,107,1320,85,1380,74.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
      {/* SVG Wave Background - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#fb923c"
            fillOpacity="0.12"
            d="M0,288L60,272C120,256,240,224,360,197.3C480,171,600,149,720,138.7C840,128,960,128,1080,144C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Step progress bar */}
        <Stepper steps={['steps']} currentStep={0} />

        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}