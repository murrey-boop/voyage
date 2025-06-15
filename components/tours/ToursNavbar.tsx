'use client';
import Link from 'next/link';
//import { useState } from 'react';
import { Currency } from '@/constants';
import { currencies } from '@/constants/currencies';
import { useRouter } from 'next/navigation';
//import { useAuthModal } from '@/providers/AuthModalProvider';
import { useSession } from 'next-auth/react';
//import { signIn } from '@/auth';



export default function ToursNavbar({ isLoggedIn, firstName, currency, onCurrencyChange }: { isLoggedIn: boolean; firstName: string; currency: Currency; onCurrencyChange: (newCurrency: Currency) => void }) {
   const router = useRouter();
  
  const { data: session } = useSession();

    const handleLoginClick = () => {
    router.push('/auth/signin');
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-8 sm:px-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-montserrat text-teal-600">
          Digital Voyaging
        </Link>
        <div className="flex items-center space-x-4">
          <select
            value={currency.code}
            onChange={(e) => {
              const selectedCurrency = currencies.find((c) => c.code === e.target.value) || currencies[0];
              onCurrencyChange(selectedCurrency);
            }}
            className="border rounded-lg p-2 font-lato text-sm"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
          <Link
            href="/tours/plan-holiday"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Start Your Trip
          </Link>
          {isLoggedIn ? (
            <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-montserrat">
              {firstName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Link 
            href="/auth/signin" 
            className="text-teal-600 hover:text-teal-700 font-lato"
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick();
            }}
            >
              {session ? 'My Account' : 'Sign In'}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}