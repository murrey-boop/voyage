'use client';

import React, { useState ,useEffect} from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Plane, MapPin, Star, Users, Clock, CheckCircle, XCircle, ArrowRightLeft, Calendar } from 'lucide-react';
import { Tour } from '@/data/tours';
import { Flight } from '@/data/flights';
import { Visa } from '@/data/visa';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FlightDeal } from '@/types/flights';
import { VisaPromo } from '@/types/visa';
import {
  //getGuestFavorites,
  isGuestFavorite,
  addGuestFavorite,
  removeGuestFavorite,
} from '@/lib/guestFavorites';

export type Props = {
  type: 'tours' | 'flights' | 'visas';
  data: Tour | Flight | Visa | FlightDeal | VisaPromo;
};

const TourCardItem: React.FC<Props> = ({ type, data }) => {
  const { data: session } = useSession();
  const id = String('id' in data ? data.id : ""); // fallback if missing
  const [isFavorite, setIsFavorite] = useState(false);


  // On mount, check favorite status
  useEffect(() => {
    if (session?.user) {
      // Optionally: fetch from API /api/favorites?type=...&itemId=...
      // For simplicity, fetch all favorites on page (could optimize)
      fetch("/api/favorites")
        .then(res => res.json())
        .then(({ favorites }: { favorites: { type: string; itemId: string }[] }) => {
          setIsFavorite(favorites?.some((f) => f.type === type && f.itemId === id));
        });
    } else {
      setIsFavorite(isGuestFavorite(type, id));
    }
    
  }, [session?.user, id, type]);


  const handleFavorite = async () => {
    if (!id) return;
    if (session?.user) {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, itemId: id }),
      });
      if (res.ok) setIsFavorite(!isFavorite);
    } else {
      if (isFavorite) {
        removeGuestFavorite(type, id);
      } else {
        addGuestFavorite(type, id);
      }
      setIsFavorite(!isFavorite);
    }
  };

  // Get image, fallback if not present
  const getImage = () => {
    if ('image' in data && data.image) return data.image;
    return '/images/fallback.jpg';
  };

  // Get title
  const getTitle = () => {
    if ('title' in data) return data.title;
    return 'Untitled';
  };

  // Get price as string
  const getPrice = () => {
    if ('price' in data) return data.price;
    return '';
  };

  // Prepare booking link with query params for booking page
  const getBookingLink = () => {
    if (type === 'tours') {
      const tour = data as Tour;
      // Pass ID, title, and location as query params
      const params = new URLSearchParams({
        tourId: String(tour.id),
        title: tour.title,
        destination: tour.location || '',
      });
      return `/booking?${params.toString()}`;
    }
    if (type === 'flights') {
      const flight = data as Flight;
      // You can add more params as needed
      const params = new URLSearchParams({
        flightId: String(flight.id),
        route: flight.route,
      });
      return `/booking?${params.toString()}`;
    }
    if (type === 'visas') {
      const visa = data as Visa;
      const params = new URLSearchParams({
        visaId: String(visa.id),
        country: visa.country,
      });
      return `/booking?${params.toString()}`;
    }
    return '#';
  };

  // Render details for each card type
  const renderDetails = () => {
    if (type === 'tours') {
      const tour = data as Tour;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span>{tour.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{tour.people} people</span>
          </div>
          {tour.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
          )}
        </div>
      );
    }

    if (type === 'flights') {
      const flight = data as Flight;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div className="flex items-center gap-1">
            <ArrowRightLeft className="w-4 h-4" />
            <span>{flight.route}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{flight.hours} hours</span>
          </div>
          <div className="flex items-center gap-1">
            {flight.isDirect ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Direct flight</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-orange-500" />
                <span>{flight.stops ?? 1} stop{flight.stops && flight.stops > 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>
      );
    }

    if (type === 'visas') {
      const visa = data as Visa;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{visa.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Valid for: {visa.validity}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className="relative rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-900 transition-all group"
    >
      {/* Favorite + Wishlist */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={handleFavorite}>
              <Heart className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Bookmark className="text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save to wishlist</TooltipContent>
        </Tooltip>
      </div>

      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={getImage()}
          alt={getTitle()}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/fallback.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          {type === 'tours' && <MapPin className="w-5 h-5" />}
          {type === 'flights' && <Plane className="w-5 h-5" />}
          {type === 'visas' && (
            <Image src="/icons/passport.png" alt="Visa Icon" width={20} height={20} />
          )}
          <h3 className="text-lg font-bold text-gray-800 truncate">{getTitle()}</h3>
        </div>

        {renderDetails()}

        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">{getPrice()}</p>
          <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={getBookingLink()}>Book Now</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCardItem;