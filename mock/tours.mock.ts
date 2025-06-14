// @/mock/tours.mock.ts

import type { Tour } from '@/types/tours';
import { FlightDeal } from '@/types/flights';
import type  { VisaPromo } from '@/types/visa';
import { MapPin } from 'lucide-react';

export const mockTours: Tour[] = [

  {
    id: 'tour1',
    name: 'safari',
    image: '/images/safari.jpg',
    rating: 4.8,
    reviewsCount: 120,
    duration: '7 days',
    groupSize: '10-15',
    difficulty: 'Challenging',
    price: 850,
    originalPrice: 1200,
    icon: MapPin,
  },
  {
    id: 'tour2',
    name: 'Safari in Maasai Mara',
    image: '/images/maasai-mara.jpg',
    rating: 4.9,
    reviewsCount: 200,
    duration: '5 days',
    groupSize: '8-12',
    difficulty: 'Moderate',
    price: 720,
    originalPrice: 1000,
    icon: MapPin,
  },
    {
    id: 'tour3',
    name: 'Beach life',
    image: '/images/zanzibar.jpg',
    rating: 4.9,
    reviewsCount: 200,
    duration: '5 days',
    groupSize: '8-12',
    difficulty: 'Moderate',
    price: 720,
    originalPrice: 1000,
    icon: MapPin ,
  },
];

export const mockFlights: FlightDeal[] = [
  {
    id: 'flight1',
    title: 'Nairobi to Dubai',
    destination: 'Dubai',
    airline: 'Emirates',
    duration: '6h 30m',
    stops: 0,
    price: 499,
    image: '/images/flights/dubai.jpg',
  },
];

export const mockVisas: VisaPromo[] = [
  {
    id: 'visa1',
    title: 'UAE Tourist Visa',
    country: 'United Arab Emirates',
    price: 150,
    image: '/images/dubai.jpg',
  },
    {
    id: 'visa1',
    title: 'Australia visa',
    country: 'Australia',
    price: 150,
    image: '/images/sydney.jpg',
  },
    {
    id: 'visa3',
    title: 'Europe Tourist Visa',
    country: 'England',
    price: 150,
    image: '/images/london.jpg',
  },

];
