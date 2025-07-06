'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function VisaSuccessPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Application Submitted Successfully!</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-6">
        We&apos;ve received your visa application. You&apos;ll receive an email confirmation shortly with your application summary. Our team will review your details and reach out soon.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
