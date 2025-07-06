'use client';
import React from 'react';
import { useEffect, useState } from 'react';

interface Props {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: Props) {
  const maxSteps = steps.length;
  const [current, setCurrentStep] = useState(currentStep);


  useEffect(() => {
    const savedStep = Number(localStorage.getItem('visaApplyCurrentStep'));
    if (!isNaN(savedStep) && savedStep > 0 && savedStep < maxSteps) {
      setCurrentStep(savedStep);
    }
  }, [maxSteps]);

  return (
    <div className="flex justify-between items-center">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`h-2 rounded-full transition-all ${
              index <= current ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
          <div className={`text-sm mt-2 ${index === current ? 'font-bold' : ''}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

