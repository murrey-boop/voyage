//intergrate with the auth context,id of the user
// app/tours/[id]/page.tsx
//import { BookingForm } from '@/components/BookingForm';
//import { fetchTourAvailability } from '@/lib/api';

'use client';
import { useState } from 'react';
import ToursNavbar from '@/components/tours/ToursNavbar';
import ToursHero from '@/components/tours/ToursHero';
import DestinationCards from '@/components/tours/DestinationCards';
import TourServices from '@/components/tours/ToursService';
import PopularTours from '@/components/tours/PopularTours';
import FooterTours from '@/components/tours/TourFooter';
import { destinations } from '@/constants/destination';
import { tours } from '@/constants/tours';
import { defaultCurrency } from '@/constants/currencies';
import Head from 'next/head';

  


export default function ToursPage() {
//chaange this to use the user name from the auth context
  // const { user } = useAuth();
  // const name = user?.name || 'Guest';
  // const isLoggedIn = !!user;
  // const firstName = name.split(' ')[0];
  // const currency = user?.currency || defaultCurrency;
  // const handleCurrencyChange = (newCurrency) => {
  //   setCurrency(newCurrency);
  //   // Update the user's currency in the auth context or API
  //   updateUserCurrency(newCurrency);
  // };
  // const handleSearch = (searchParams) => {
  //   return tours.filter((tour) =>
  //     tour.title.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
  //     tour.region.toLowerCase().includes(searchParams.destination.toLowerCase())
  //   );
  // };

        <Head>
        <title>Explore Tours  | Digital Voyage</title>
        <meta name="description" content="Book tours with digital voyage" />
        <meta property="og:title" content="Explore Tours | Digital Voyage" />
        <meta property="og:description" content="Explore and book Tours with Digital Voyage." />
        <meta property="og:image" content="/images/seo/tours.jpg" />
        <meta property="og:type" content="website" />
      </Head>

  let name= 'John Doe';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState(name);
  const [currency, setCurrency] = useState(defaultCurrency);


  const handleSearch = (searchParams: { destination: string }) => {
    return tours.filter((tour) =>
      tour.title.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
      tour.region.toLowerCase().includes(searchParams.destination.toLowerCase())
    );
  };

  const handleCurrencyChange = (newCurrency: { code: string; symbol: string; rate: number }) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="font-inter">
      <ToursNavbar isLoggedIn={isLoggedIn} firstName={firstName} currency={currency} onCurrencyChange={handleCurrencyChange} />
      <ToursHero onSearch={handleSearch} />
      <div className="container mx-auto px-8 sm:px-16">
        <article className="mb-16">
          <DestinationCards destinations={destinations} />
        </article>
        <TourServices />
        <PopularTours tours={tours} currency={currency} />
      </div>
      <FooterTours />
    </div>
  ); 
}

{/*}

export const metadata = {
  title: "Explore Top Tours | Digital Voyage",
  description: "Browse top destinations and adventures with Digital Voyage. Book now and explore the world.",
  keywords: ["tours", "travel", "bookings", "destinations", "Digital Voyage"],
  openGraph: {
    title: "Top Tours | Digital Voyage",
    description: "Explore amazing tours from Africa to the world with Digital Voyage.",
    url: "https://digitalvoyage.com/tours",
    siteName: "Digital Voyage",
    images: [
      {
        url: "/images/paris.jpg",
        width: 1200,
        height: 630,
        alt: "Paris Tour",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Tours with Digital Voyage",
    description: "Top-rated tours and bookings, personalized just for you.",
    images: ["/images/paris.jpg"],
  },
};

*/}









{/*
  // app/tours/[id]/page.tsx
import { BookingForm } from '@/components/BookingForm';
import { fetchTourAvailability } from '@/lib/api';

export default async function TourPage({ params }: { params: { id: string } }) {
  const tour = await getTourById(params.id);
  const availability = await fetchTourAvailability(params.id);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        // your T\tour details 
      </div>
      <div className="sticky top-4">
        <BookingForm tour={{ ...tour, availability }} />
      </div>
    </div>
  );
}
  */}