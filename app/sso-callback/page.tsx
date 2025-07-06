'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function SsoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      // Check for after_sign_in_url param, else default to home
      const afterSignInUrl = searchParams.get('after_sign_in_url') || '/';
      router.replace(afterSignInUrl);
    }
    // Optionally, handle error state if not signed in after SSO
  }, [isSignedIn, router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg text-gray-600">Completing sign in&hellip;</span>
    </div>
  );
}