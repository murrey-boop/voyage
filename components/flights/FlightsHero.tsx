
'use client';

import { gsap } from 'gsap';
import {useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FlightSearchParams = {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  travelers: number;
  dates: [Date | null, Date | null]; // [departureDate, returnDate]
  [key: string]: string | number | boolean | Date | [Date | null, Date | null] | null | undefined; // For additional search parameters
};

export default function FlightHero({ onSearch }: { onSearch: (params: FlightSearchParams) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    // Hero background parallax effect
    gsap.to(heroRef.current, {
      backgroundPosition: '50% 20%',
      scrollTrigger: {
        trigger: heroRef.current,
        scrub: true
      }
    });

    // Form elements animation
    gsap.from(formRef.current?.children || [], {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      delay: 0.3,
      ease: "back.out"
    });

    // Search button pulse animation
    const pulseAnimation = gsap.to(searchButtonRef.current, {
      scale: 1.05,
      duration: 2.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      pulseAnimation.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ 
      from, 
      to, 
      departureDate, 
      returnDate, 
      travelers, 
      dates: [departureDate, returnDate] 
    });
    
    // Button click animation
    gsap.to(searchButtonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };
  return (
    <div 
      ref={heroRef}
      className="relative h-96 bg-[url('/images/flight-hero.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            <span className="inline-block">
              Where would you like to go?
            </span>
          </h1>
          
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="City or Airport"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                  onFocus={(e) => {
                    gsap.to(e.target, {
                      boxShadow: '0 0 0 2px rgba(20,184,166,0.5)',
                      duration: 0.3
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.target, {
                      boxShadow: 'none',
                      duration: 0.3
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="City or Airport"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                  onFocus={(e) => {
                    gsap.to(e.target, {
                      boxShadow: '0 0 0 2px rgba(20,184,166,0.5)',
                      duration: 0.3
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.target, {
                      boxShadow: 'none',
                      duration: 0.3
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Departure</label>
                <input
                  type="date"
                  onChange={(e) => setDepartureDate(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Return (Optional)</label>
                <input
                  type="date"
                  onChange={(e) => setReturnDate(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <Button 
              ref={searchButtonRef}
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Flights
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}