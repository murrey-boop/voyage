import React from 'react';

interface Props {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: Props) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`h-2 rounded-full transition-all ${
              index <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
          <div className={`text-sm mt-2 ${index === currentStep ? 'font-bold' : ''}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
