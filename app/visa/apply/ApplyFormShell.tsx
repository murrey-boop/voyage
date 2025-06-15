'use client';

import React from 'react';
import { TripDetailsForm } from './steps/TripDetailsForm';
import { PersonalInfoForm } from './steps/PersonalInfoForm';
import DocumentUploadForm from './steps/DocumentUploadForm';
import CheckoutForm from './steps/CheckoutForm';
import Stepper from './Stepper';
import { useForm, FormProvider } from 'react-hook-form';
import { useVisaFormStore } from '@/stores/VisaFormStore';

const steps = ['Trip Details', 'Personal Info', 'Documents', 'Checkout'];

export default function ApplyFormShell() {
  const methods = useForm();

  const currentStep = useVisaFormStore((state) => state.currentStep);
  const goToStep = useVisaFormStore((state) => state.goToStep);

  const next = () => goToStep(Math.min(currentStep + 1, steps.length - 1));
  const back = () => goToStep(Math.max(currentStep - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TripDetailsForm onNext={next} key="step-0" />;
      case 1:
        return <PersonalInfoForm onNext={next} onBack={back} key="step-1" />;
      case 2:
        return <DocumentUploadForm onNext={next} onBack={back} key="step-2" />;
      case 3:
        return <CheckoutForm onBack={back} key="step-3" />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="mt-8">{renderStep()}</div>
      </div>
    </FormProvider>
  );
}
