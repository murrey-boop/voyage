'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Flight } from '@/types/flights';

interface FlightCardsProps {
  flights: Flight[];
  isStudentView?: boolean;
}

const FlightCards = ({ flights, isStudentView = false }: FlightCardsProps) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Card entrance animation
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".flight-cards-container",
        start: "top 80%"
      }
    });

    // Setup hover animations
    cardsRef.current.forEach(card => {
      if (!card) return;
      
      gsap.set(card, { transformPerspective: 1000 });
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          duration: 0.3
        });
      });
    });
  }, [flights]);

  return (
    <div className="flight-cards-container grid grid-cols-1 gap-4">
      {flights.map((flight, index) => (
        <div 
          key={flight.id}
          ref={el => { cardsRef.current[index] = el; }}
          className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 ${
            flight.isStudentDeal ? 'border-l-4 border-blue-500' : ''
          }`}
        >
          <div className="p-4 flex flex-col md:flex-row">
            {/* Airline Info */}
            <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
              <div className="w-16 h-16 relative mr-3">
                <Image 
                  src={flight.airlineLogo} 
                  alt={flight.airline}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold">{flight.airline}</h3>
                <p className="text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
            </div>

            {/* Flight Times */}
            <div className="md:w-2/4 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{flight.departureTime}</p>
                  <p className="text-gray-500 text-sm">{flight.origin}</p>
                </div>
                <div className="px-4 text-center">
                  <div className="relative w-24 h-1 bg-gray-200 mx-auto my-2">
                    <div 
                      className="absolute top-0 left-0 h-full bg-teal-500" 
                      style={{ width: `${Math.min(100, parseInt(flight.duration) * 5)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{flight.duration}</p>
                  <p className="text-xs mt-1">
                    {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                  <p className="text-gray-500 text-sm">{flight.destination}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="md:w-1/4 flex flex-col items-end justify-center mt-4 md:mt-0">
              <p className="text-2xl font-bold text-teal-600">${flight.price}</p>
              {isStudentView && flight.studentDiscount && (
                <p className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1">
                  {flight.studentDiscount}% student discount
                </p>
              )}
              <button 
                className={`mt-3 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors book-btn-${flight.id}`}
                aria-label={`Book flight to ${flight.destination} with ${flight.airline}`}
                onClick={() => {
                  // Button click animation
                  gsap.to(`.book-btn-${flight.id}`, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                  });
                }}
              >
                {isStudentView ? 'Apply as Student' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightCards;