'use client';
import { useState } from 'react';
import FlightHero from '@/components/flights/FlightsHero';
import FlightCards from '@/components/flights/FlightCards';
import AboutUs from '@/components/flights/AboutUs';
import Footer from '@/components/Footer';
import NotificationBanner from '@/components/flights/NotificationBanner';
import { Loader2, Plane, ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';
import { Flight, FlightSearchParams } from '@/types/flights';
import Head from 'next/head';
import FlightNavbar from '@/components/flights/FightNavbar';

// Constants moved to separate section for better organization
const AIRLINE_LOGOS = {
  QR: { src: '/airlines/qatar.jpg', width: 64, height: 64 },
  EK: { src: '/airlines/emirates.jpg', width: 64, height: 64 },
  BA: { src: '/airlines/british-airways.jpg', width: 64, height: 64 },
  DL: { src: '/airlines/delta.jpg', width: 64, height: 64 },
  AA: { src: '/airlines/american.jpg', width: 64, height: 64 },
  UA: { src: '/airlines/united.jpg', width: 64, height: 64 },
  LH: { src: '/airlines/lufthansa.jpg', width: 64, height: 64 },
  AF: { src: '/airlines/airfrance.jpg', width: 64, height: 64 },
  KL: { src: '/airlines/klm.jpg', width: 64, height: 64 },
  SQ: { src: '/airlines/singapore.jpg', width: 64, height: 64 },
  default: { src: '/airlines/generic.jpg', width: 64, height: 64 }
};

const CITY_IMAGES = {
  DOH: { src: '/images/doha.jpg', width: 800, height: 600 },
  JFK: { src: '/images/new-york.jpg', width: 800, height: 600 },
  DXB: { src: '/images/dubai.jpg', width: 800, height: 600 },
  LHR: { src: '/images/london.jpg', width: 800, height: 600 },
  default: { src: '/images/city-default.jpg', width: 800, height: 600 }
};

const STUDENT_DESTINATIONS = [
  {
    city: 'Boston',
    country: 'USA',
    universityNearby: 'Harvard, MIT, Boston University',
    iataCode: 'BOS'
  },
  {
    city: 'London',
    country: 'UK',
    universityNearby: 'Imperial College, UCL, LSE',
    iataCode: 'LHR'
  },
  {
    city: 'Melbourne',
    country: 'Australia',
    universityNearby: 'University of Melbourne, Monash',
    iataCode: 'MEL'
  }
];

const STATIC_FLIGHTS: Flight[] = [
  { 
    id: '1', 
    city: 'Doha', 
    country: 'Qatar', 
    price: 450, 
    airline: 'Qatar Airways', 
    airlineLogo: AIRLINE_LOGOS.QR.src,
    duration: '6h 20m', 
    departureTime: '08:45', 
    arrivalTime: '15:05', 
    stops: 0,
    image: CITY_IMAGES.DOH.src,
    width: CITY_IMAGES.DOH.width,
    height: CITY_IMAGES.DOH.height,
    flightNumber: 'QR 542'
  },
  { 
    id: '2', 
    city: 'New York', 
    country: 'USA', 
    price: 800, 
    airline: 'Delta', 
    airlineLogo: AIRLINE_LOGOS.DL.src,
    duration: '15h 10m', 
    departureTime: '22:30', 
    arrivalTime: '13:40', 
    stops: 1,
    image: CITY_IMAGES.JFK.src,
    width: CITY_IMAGES.JFK.width,
    height: CITY_IMAGES.JFK.height,
    isStudentDeal: true,
    studentDiscount: 15,
    universityNearby: 'Columbia University, NYU',
    flightNumber: 'DL 123'
  },
  { 
    id: '3', 
    city: 'Dubai', 
    country: 'UAE', 
    price: 600, 
    airline: 'Emirates', 
    airlineLogo: AIRLINE_LOGOS.EK.src,
    duration: '7h 15m', 
    departureTime: '10:20', 
    arrivalTime: '17:35', 
    stops: 0,
    image: CITY_IMAGES.DXB.src,
    width: CITY_IMAGES.DXB.width,
    height: CITY_IMAGES.DXB.height,
    flightNumber: 'EK 722'
  },
  { 
    id: '4', 
    city: 'London', 
    country: 'UK', 
    price: 700, 
    airline: 'British Airways', 
    airlineLogo: AIRLINE_LOGOS.BA.src,
    duration: '8h 45m', 
    departureTime: '09:15', 
    arrivalTime: '18:00', 
    stops: 0,
    image: CITY_IMAGES.LHR.src,
    width: CITY_IMAGES.LHR.width,
    height: CITY_IMAGES.LHR.height,
    isStudentDeal: true,
    studentDiscount: 10,
    universityNearby: 'Imperial College, UCL',
    flightNumber: 'BA 114'
  }
];

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showStudentDeals, setShowStudentDeals] = useState(false);
  const handleSearch = async (searchParams: FlightSearchParams) => {
    setSearchPerformed(true);
    setIsLoading(true);
    setErrorMessage('');
    setShowStudentDeals(searchParams.isStudent || false);

    try {
      if (!searchParams.to || !searchParams.from || !searchParams.departureDate || !searchParams.dates) {
        throw new Error('Please enter all required fields.');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, replace with actual API call
      const demoFlights = STATIC_FLIGHTS.map(flight => ({
        ...flight,
        price: Math.round(flight.price * (0.8 + Math.random() * 0.4))
      }));

      setFlights(demoFlights);
    } catch (error) {
      console.error('Flight search error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to search flights. Showing sample data instead.'
      );
      setFlights(STATIC_FLIGHTS);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').trim();
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  return (
    <>
      <Head>
        <title>Search Flights | Digital Voyage</title>
        <meta name="description" content="Find and book affordable flights to top destinations." />
        <meta property="og:title" content="Search Flights | Digital Voyage" />
        <meta property="og:description" content="Explore and book flights with Digital Voyage." />
        <meta property="og:image" content="/images/seo/flights.jpg" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <FlightNavbar />
        
        {errorMessage && (
          <NotificationBanner 
            message={errorMessage} 
            onClose={() => setErrorMessage('')} 
          />
        )}
        
        <FlightHero onSearch={handleSearch} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
              <span className="ml-3 text-lg">Searching for flights...</span>
            </div>
          ) : (
            <>
              {searchPerformed && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">
                    {showStudentDeals ? 'Student Flight Deals' : 'Available Flights'}
                  </h2>
                  <FlightCards 
                    flights={flights} 
                    isStudentView={showStudentDeals} 
                  />
                </section>
              )}

              <StudentDealsSection 
                showStudentDeals={showStudentDeals}
                setShowStudentDeals={setShowStudentDeals}
              />
              
              <PopularDestinationsSection />
              
              <SpecialDealsSection />
            </>
          )}
        </main>
        
        <AboutUs />
        <Footer />
      </div>
    </>
  );
}

// Extract components for better organization
const StudentDealsSection = ({ 
  showStudentDeals, 
  setShowStudentDeals 
}: { 
  showStudentDeals: boolean;
  setShowStudentDeals: (value: boolean) => void;
}) => (
  <section className="mb-12 bg-blue-50 p-6 rounded-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Student Specials</h2>
      <button 
        onClick={() => setShowStudentDeals(!showStudentDeals)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {showStudentDeals ? 'Show All Flights' : 'Show Student Deals'}
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STATIC_FLIGHTS
        .filter(f => f.isStudentDeal)
        .map(flight => (
          <div key={`student-${flight.id}`} className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue-200 hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src={flight.image} 
                alt={flight.city} 
                width={flight.width}
                height={flight.height}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
                {flight.studentDiscount}% STUDENT DISCOUNT
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{flight.city}</h3>
              <p className="text-blue-600 font-medium">Near: {flight.universityNearby}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-500 line-through">${flight.price}</span>
                <span className="font-bold text-xl">
                  ${Math.round(flight.price * (1 - (flight.studentDiscount || 0)/100))}
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </section>
);

const PopularDestinationsSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
    <FlightCards flights={STATIC_FLIGHTS} />
  </section>
);

const SpecialDealsSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">Special Deals</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STATIC_FLIGHTS.slice(0, 3).map(flight => (
        <div key={`deal-${flight.id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image
              src={flight.image} 
              alt={flight.city} 
              width={flight.width}
              height={flight.height}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-bold text-xl">{flight.city}</h3>
              <p className="text-white/80">From ${flight.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);