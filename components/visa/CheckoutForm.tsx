'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useVisaFormStore } from '@/stores/VisaFormStore';
import Image from 'next/image';

export default function CheckoutForm() {
  const router = useRouter();
  const { tripDetails, personalInfo, uploadedFiles } = useVisaFormStore();

  const handleStripeCheckout = async () => {
    try {
      toast.loading('Redirecting to Stripe checkout...');

      const res = await fetch('/api/payment/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ tripDetails, personalInfo }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      toast.error('Stripe checkout failed.');
    } finally {
      toast.dismiss();
    }
  };

  const handleMpesaPayment = async () => {
    try {
      toast.loading('Initializing M-Pesa...');

      const res = await fetch('/api/payment/mpesa/initiate', {
        method: 'POST',
        body: JSON.stringify({ tripDetails, personalInfo }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { success } = await res.json();
      if (success) {
        toast.success('Payment initiated. You will be redirected.');
        router.push('/visa/success');
      } else {
        toast.error('M-Pesa payment failed.');
      }
    } catch {
      toast.error('Something went wrong with M-Pesa.');
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="space-y-2">
        <p><strong>Country:</strong> {tripDetails?.destination}</p>
        <p><strong>Visa Type:</strong> {tripDetails?.visaType}</p>
        <p><strong>Applicant:</strong> {personalInfo?.firstName} {personalInfo?.lastName}</p>
        <p><strong>Fee:</strong> $120</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Choose Payment Method</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleStripeCheckout} className="flex items-center gap-2 bg-black text-white">
            <Image src="/icons/stripe.svg" alt="Stripe" className="h-6" />
            Pay with Card
          </Button>

          <Button onClick={handleMpesaPayment} className="flex items-center gap-2 border border-green-600 text-green-700">
            <Image src="/icons/mpesa.svg" alt="M-Pesa" className="h-6" />
            Pay via M-Pesa
          </Button>
        </div>
      </div>
    </div>
  );
}
