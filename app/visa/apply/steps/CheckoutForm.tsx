'use client';

import React, { useState } from 'react';
import { useVisaFormStore } from '@/stores/VisaFormStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { initiateMpesaPayment } from '@/utils/payments';
import { createVisaApplication } from '@/utils/api';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';


interface CheckoutFormProps {
  onBack: () => void;
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'stripe' | 'mpesa'>('stripe');
  const router = useRouter();

  interface TripDetails {
    destination: string;
    visaType: string;
    startDate: string;
    endDate: string;
  }

  interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }

  interface Document {
    fileName: string;
    url?: string;
    [key: string]: unknown;
  }

  interface VisaFormData {
    tripDetails?: TripDetails;
    personalInfo?: PersonalInfo;
    documents?: Document[];
    [key: string]: unknown;
  }

  const formData: VisaFormData = useVisaFormStore();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const app = await createVisaApplication(formData); // Save to DB

      if (method === 'stripe') {
        const stripe = await stripePromise;
        const res = await fetch('/api/stripe/checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visaApplicationId: app.id }),
        });

        const { sessionId } = await res.json();
        await stripe?.redirectToCheckout({ sessionId });
      }

      if (method === 'mpesa') {
        await initiateMpesaPayment({ visaApplicationId: app.id });
        router.push('/visa/success');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review and Pay</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Trip Details</h3>
        <p>Destination: {formData.tripDetails?.destination}</p>
        <p>Visa Type: {formData.tripDetails?.visaType}</p>
        <p>Start: {formData.tripDetails?.startDate}</p>
        <p>End: {formData.tripDetails?.endDate}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Personal Info</h3>
        <p>Name: {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}</p>
        <p>Email: {formData.personalInfo?.email}</p>
        <p>Phone: {formData.personalInfo?.phone}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Documents</h3>
        {formData.documents && formData.documents.length > 0 ? (
          <ul className="list-disc ml-6">
            {formData.documents.map((doc, idx) => (
              <li key={idx}>{doc.fileName}</li>
            ))}
          </ul>
        ) : (
          <p>No documents uploaded.</p>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-2">Payment Method</h3>
        <div className="flex space-x-4">
          <button
            className={`p-2 rounded border ${method === 'stripe' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setMethod('stripe')}
          >
            <Image src="/icons/stripe.svg" alt="Stripe" className="h-6" width="23" height="23" />
          </button>
          <button
            className={`p-2 rounded border ${method === 'mpesa' ? 'border-green-500' : 'border-gray-300'}`}
            onClick={() => setMethod('mpesa')}
          >
            <Image src="/icons/mpesa.svg" alt="M-Pesa" className="h-6" width="23" height="23" />
          </button>
        </div>
      </div>

      <Button type="button" onClick={onBack}>Back</Button>

      <Button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Complete Payment'}
      </Button>
    </div>
  );
}
