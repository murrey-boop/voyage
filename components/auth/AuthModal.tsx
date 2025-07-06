'use client';
import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import { X } from 'lucide-react';

export default function AuthModal({ open, onClose, initialTab = 'sign-in' }: { open: boolean; onClose: () => void; initialTab?: 'sign-in' | 'sign-up' }) {
  const [tab, setTab] = useState(initialTab);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-neutral-900 rounded-2xl shadow-xl px-7 py-8 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
        >
          <X size={22} />
        </button>

        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button
            className={`flex-1 py-2 rounded-t-lg font-medium transition ${
              tab === 'sign-in'
                ? 'bg-white text-neutral-900'
                : 'bg-transparent text-white border-b border-white/30'
            }`}
            onClick={() => setTab('sign-in')}
          >
            Log in
          </button>
          <button
            className={`flex-1 py-2 rounded-t-lg font-medium transition ${
              tab === 'sign-up'
                ? 'bg-white text-neutral-900'
                : 'bg-transparent text-white border-b border-white/30'
            }`}
            onClick={() => setTab('sign-up')}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <div className="w-full">
          {tab === 'sign-in' ? (
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-white text-neutral-900 font-semibold hover:bg-blue-600 hover:text-white transition',
                  card: 'bg-neutral-900 text-white rounded-xl shadow-none',
                  headerTitle: 'font-bold text-2xl mb-4 text-center',
                  socialButtonsBlockButton: 'bg-black text-white hover:bg-gray-800 mt-3',
                  dividerText: 'text-gray-400',
                  formFieldInput: 'bg-black text-white',
                  footerActionText: 'text-gray-400',
                  // ...add more for pixel-perfect look
                },
              }}
              afterSignInUrl="/"
              signUpUrl="#"
            />
          ) : (
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-white text-neutral-900 font-semibold hover:bg-blue-600 hover:text-white transition',
                  card: 'bg-neutral-900 text-white rounded-xl shadow-none',
                  headerTitle: 'font-bold text-2xl mb-4 text-center',
                  socialButtonsBlockButton: 'bg-black text-white hover:bg-gray-800 mt-3',
                  dividerText: 'text-gray-400',
                  formFieldInput: 'bg-black text-white',
                  footerActionText: 'text-gray-400',
                  
                },
              }}
              afterSignUpUrl="/"
              signInUrl="#"
            />
          )}
        </div>
      </div>
    </div>
  );
}