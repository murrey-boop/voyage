'use client';

import React, { useState } from 'react';
import { useVisaFormStore } from '@/stores/VisaFormStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { toast } from 'sonner';
import { HiOutlineDocument, HiOutlineArrowLeft, HiOutlineChevronRight } from 'react-icons/hi2';

interface CheckoutFormProps {
  onBack: () => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'stripe' | 'mpesa'>('stripe');
  const router = useRouter();
  const { user } = useUser();

  // Get all form data from store
  const formData = useVisaFormStore();

  // Type guard or fallback for tripDetails if not present in store type

  async function handlePayment() {
    setLoading(true);
    toast.dismiss();
    try {
      // Save visa application
      const resApp = await fetch('/api/visa/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!resApp.ok) throw new Error('Failed to save application.');
      const app = await resApp.json();

      if (method === 'stripe') {
        const stripe = await stripePromise;
        const res = await fetch('/api/stripe/checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visaApplicationId: app.id,
            // Pull Clerk billing details if available
            billing: {
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            },
          }),
        });

        const { sessionId, error } = await res.json();
        if (error || !sessionId) throw new Error(error || 'Stripe error');
        toast.success('Redirecting to Stripe...');
        await stripe?.redirectToCheckout({ sessionId });
      }
      if (method === 'mpesa') {
        const res = await fetch('/api/mpesa/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visaApplicationId: app.id }),
        });
        const { success, error } = await res.json();
        if (!success) throw new Error(error || 'M-Pesa failed');
        toast.success('M-Pesa payment initiated. Redirecting...');
        router.push('/visa/success');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || 'Payment failed.');
      } else {
        toast.error('Payment failed.');
      }
    } finally {
      setLoading(false);
    }
  }

  // Define a type for the document object
  interface DocumentThumbProps {
    doc: {
      url?: string;
      type?: string;
      fileName: string;
    };
  }

  // Helper: PDF or image for doc
  function DocThumb({ doc }: DocumentThumbProps) {
    if (doc.url?.endsWith('.pdf') || doc.type === 'application/pdf') {
      return (
        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
          <HiOutlineDocument className="w-10 h-10 text-orange-500 group-hover:text-orange-600" />
          <span className="text-xs text-gray-600 group-hover:underline truncate max-w-[7rem]">{doc.fileName}</span>
        </a>
      );
    }
    if (doc.url) {
      return (
        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
          <Image
            src={doc.url}
            alt={doc.fileName}
            width={70}
            height={70}
            className="rounded-md object-cover border border-orange-100 shadow"
          />
          <span className="text-xs text-gray-600 group-hover:underline truncate max-w-[7rem]">{doc.fileName}</span>
        </a>
      );
    }
    return <span className="text-xs text-gray-400">{doc.fileName}</span>;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">Step 4 of 4</span>
        <div className="flex-1 h-2 mx-4 bg-orange-50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: '100%' }} />
        </div>
        <span className="text-xs font-semibold text-orange-600">Review & Pay</span>
      </div>

      {/* Clerk User */}
      {user && (
        <div className="flex items-center gap-3 mb-6">
          {user.imageUrl && (
            <Image src={user.imageUrl} alt="User" width={40} height={40} className="rounded-full" />
          )}
          <span className="font-medium text-gray-800 dark:text-gray-100">{user.fullName}</span>
        </div>
      )}

      {/* Review Sections */}
      <div className="mb-8">
        <div className="mb-4 bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-orange-700">Trip Details</h3>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <HiOutlineArrowLeft className="mr-1" /> Edit
            </Button>
          </div>
          <ul className="text-sm mt-2 space-y-1">
            <li><strong>Destination:</strong> {formData.tripDetails?.destination}</li>
            <li><strong>Visa Type:</strong> {formData.tripDetails?.visaType}</li>
            <li><strong>Start:</strong> {formData.tripDetails?.startDate}</li>
            <li><strong>End:</strong> {formData.tripDetails?.endDate}</li>
          </ul>
        </div>

        <div className="mb-4 bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-orange-700">Personal Info</h3>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <HiOutlineArrowLeft className="mr-1" /> Edit
            </Button>
          </div>
          <ul className="text-sm mt-2 space-y-1">
            <li><strong>Name:</strong> {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}</li>
            <li><strong>Email:</strong> {formData.personalInfo?.email}</li>
            <li><strong>Phone:</strong> {formData.personalInfo?.phone}</li>
          </ul>
        </div>

        <div className="mb-4 bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-orange-700">Uploaded Documents</h3>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <HiOutlineArrowLeft className="mr-1" /> Edit
            </Button>
          </div>
          <div className="flex gap-3 mt-2 flex-wrap">
            {formData.uploadedFiles && formData.uploadedFiles.length > 0
              ? formData.uploadedFiles.map((doc: DocumentThumbProps["doc"], idx: number) => (
                  <DocThumb doc={doc} key={idx} />
                ))
              : <span className="text-sm text-gray-400">No documents uploaded.</span>}
          </div>
        </div>
      </div>

      {/* Fee Highlight */}
      <div className="flex items-center justify-between bg-orange-100 px-5 py-3 rounded-lg mb-7">
        <div>
          <span className="block text-sm text-orange-800 font-semibold">Visa Application Fee</span>
          <span className="text-2xl font-bold text-orange-700">$120</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">Choose Payment Method</h3>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button
            onClick={() => setMethod('stripe')}
            className={`flex-1 flex items-center gap-2 justify-center ${method === 'stripe' ? 'ring-2 ring-orange-400' : ''}`}
            variant={method === 'stripe' ? 'default' : 'outline'}
            disabled={loading}
          >
            <Image src="/icons/stripe.svg" alt="Stripe" width={32} height={32} />
            Pay with Card
          </Button>
          <Button
            onClick={() => setMethod('mpesa')}
            className={`flex-1 flex items-center gap-2 justify-center ${method === 'mpesa' ? 'ring-2 ring-green-500' : ''}`}
            variant={method === 'mpesa' ? 'default' : 'outline'}
            disabled={loading}
          >
            <Image src="/icons/mpesa.svg" alt="M-Pesa" width={32} height={32} />
            Pay via M-Pesa
          </Button>
        </div>
      </div>

      {/* Submit & Back */}
      <div className="flex items-center justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-1"
        >
          <HiOutlineArrowLeft /> Back
        </Button>
        <Button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-bold shadow-lg"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 014 12z"/>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Pay Now <HiOutlineChevronRight />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}