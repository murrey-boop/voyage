
'use client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { FlightDeal } from '@/types/flights';

export function DealCard({ 
    deal,
    isSaved,
    onSave
 }: { 
    deal: FlightDeal;
    isSaved : boolean ;
    onSave:()=>void;
}) {
  const handleLiveAgentBooking = () => {
    const message = `Hi! I want to book: ${deal.title} (${deal.price}). 
Origin: ${deal.origin}
Destination: ${deal.destination}
Date: ${deal.date}
Duration: ${deal.duration}
Stops: ${deal.stops}`;
    
    window.open(`https://wa.me/254743524370?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      
            {/* Save Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart 
          size={20} 
          className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
        />
      </button>
      {/* deal Image and discount Badge */}
      <div className="relative h-48">
        <Image
          src={deal.image}
          alt={deal.title}
          fill
          className="object-cover"
        />
        {deal.discountPercentage && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {deal.discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Deal Content */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{deal.title}</h3>
          {deal.isStudentDeal && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Student Deal
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-2 text-sm">{deal.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-teal-600">{deal.price}</span>
            <p className="text-xs text-gray-500">{deal.duration} • {deal.stops === 0 ? 'Non-stop' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}</p>
          </div>

          <button
            onClick={handleLiveAgentBooking}
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Image 
              src="/icons/whatsapp-white.svg" 
              alt="WhatsApp" 
              width={20} 
              height={20} 
              className="mr-2"
            />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}