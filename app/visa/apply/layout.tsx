// app/visa/apply/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import Stepper from './Stepper';

export const metadata: Metadata = {
  title: 'Fast Visa Processing |Digital Voyaging',
  description: 'Begin your visa application with Digital Voyaging Travel Agency.',
};

export default function ApplyVisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step progress bar */}
      <Stepper steps={['steps']} currentStep={0} />

      <main className="mt-6">
        {children}
      </main>
    </div>
  );
}
