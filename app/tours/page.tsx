'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Extend the User type to include currency
declare module 'next-auth' {
  interface User {
    currency?: {
      code: string;
      symbol: string;
      rate: number;
    };
  }
}
import ToursNavbar from '@/components/tours/ToursNavbar';
import ToursHero from '@/components/tours/ToursHero';
import DestinationCards from '@/components/tours/DestinationCards';
import TourServices from '@/components/tours/ToursService';
import PopularTours from '@/components/tours/PopularTours';
import Footer from '@/components/Footer';
import { destinations } from '@/constants/destination';
import { tours } from '@/constants/tours';
import { defaultCurrency } from '@/constants/currencies';
import Head from 'next/head';

export default function ToursPage() {
  const { data: session, status } = useSession();

  // Extract user information
  const user = session?.user;
  const name = user?.name || 'Guest';
  const isLoggedIn = !!user;
  const firstName = name.split(' ')[0];
  // You can store user's currency in your user object; fallback to defaultCurrency
  const userCurrency = user?.currency || defaultCurrency;

  // State for currency (initialize with userCurrency)
  const [currency, setCurrency] = useState(userCurrency);

  // Keep currency in sync with auth when session changes
  useEffect(() => {
    setCurrency(userCurrency);
  }, [userCurrency]);

  const handleSearch = (searchParams: { destination: string }) => {
    return tours.filter((tour) =>
      tour.title.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
      tour.region.toLowerCase().includes(searchParams.destination.toLowerCase())
    );
  };

  const handleCurrencyChange = (newCurrency: { code: string; symbol: string; rate: number }) => {
    setCurrency(newCurrency);
    // Optionally update user's currency preference via API/context here
  };

  return (
    <div className="font-inter">
      <Head>
        <title>Explore Tours | Digital Voyage</title>
        <meta name="description" content="Book tours with digital voyage" />
        <meta property="og:title" content="Explore Tours | Digital Voyage" />
        <meta property="og:description" content="Explore and book Tours with Digital Voyage." />
        <meta property="og:image" content="/images/seo/tours.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <ToursNavbar
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />
      <ToursHero onSearch={handleSearch} />
      <div className="container mx-auto px-8 sm:px-16">
        <article className="mb-16">
          <DestinationCards destinations={destinations} />
        </article>
        <TourServices />
        <PopularTours tours={tours} currency={currency} />
      </div>
      <Footer />
    </div>
  );
}