'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Plane, MapPin, Star, Calendar, Users } from 'lucide-react';
import { Tour } from '@/types/tours';
import { FlightDeal } from '@/types/flights';
import { VisaPromo } from '@/types/visa';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type Props = {
  type: 'tours' | 'flights' | 'visas';
  data: Tour | FlightDeal | VisaPromo;
};

const TourCardItem: React.FC<Props> = ({ type, data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const getImage = () => {
    if ('image' in data && data.image) return data.image;
    return '/images/nairobi.jpg';
  };

  const renderDetails = () => {
    if (type === 'tours') {
      const tour = data as Tour;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span>{tour.rating} • {tour.reviewsCount} reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{tour.groupSize}</span>
          </div>
        </div>
      );
    }

    if (type === 'flights') {
      const flight = data as FlightDeal;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex items-center gap-1">
            <Plane className="w-4 h-4" />
            <span>{flight.airline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{flight.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</span>
          </div>
        </div>
      );
    }

    if (type === 'visas') {
      const visa = data as VisaPromo;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span>Valid for: {visa.validity}</span>
        </div>
      );
    }

    return null;
  };

  const getTitle = () => {
    if ('name' in data) return data.name;
    if ('title' in data) return data.title;
    return 'Untitled';
  };

  const getPrice = () => {
    if ('price' in data) return Number(data.price);
    return 0;
  };

  const getLink = () => {
    if (type === 'tours') return `/tours/${data.id}`;
    if (type === 'flights') return `/flights`;
    return `/visa`;
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          {type === 'tours' && <MapPin className="w-5 h-5" />}
          {type === 'flights' && <Plane className="w-5 h-5" />}
          {type === 'visas' && (
            <Image src="/icons/passport.svg" alt="Visa Icon" width={20} height={20} />
          )}
          <h3 className="text-lg font-bold text-gray-800">{getTitle()}</h3>
        </div>

        {renderDetails()}

        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">${getPrice()}</p>
          <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={getLink()}>Book Now</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCardItem;
