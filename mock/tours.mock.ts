// @/mock/tours.mock.ts

import type { Tour } from '@/types/tours';
import { FlightDeal } from '@/types/flights';
import type  { VisaPromo } from '@/types/visa';

export const mockTours: Tour[] = [

  {
    id: 'tour1',
    name: 'safari',
    title: 'Safari Adventure',
    location: 'Maasai Mara, Kenya',
    category: ['Wildlife'],
    highlights: ['Big Five spotting', 'Game drives', 'Cultural visits'],
    includes: ['Accommodation', 'Meals', 'Guided tours'],
    image: '/images/safari.jpg',
    rating: 4.8,
    reviewsCount: 120,
    duration: '7 days',
    groupSize: '10-15',
    difficulty: 'Challenging',
    price: 850,
    originalPrice: 1200,
    icon: "MapPin",
  },
  {
    id: 'tour2',
    name: 'Safari in Maasai Mara',
    title: 'Safari in Maasai Mara',
    location: 'Maasai Mara, Kenya',
    category: ['Wildlife'],
    highlights: ['Big Five spotting', 'Game drives', 'Cultural visits'],
    includes: ['Accommodation', 'Meals', 'Guided tours'],
    image: '/images/maasai-mara.jpg',
    rating: 4.9,
    reviewsCount: 200,
    duration: '5 days',
    groupSize: '8-12',
    difficulty: 'Moderate',
    price: 720,
    originalPrice: 1000,
    icon: "MapPin",
  },
    {
    id: 'tour3',
    name: 'Beach life',
    title: 'Beach Life Adventure',
    location: 'Zanzibar, Tanzania',
    category: ['Beach'],
    highlights: ['White sand beaches', 'Snorkeling', 'Local cuisine'],
    includes: ['Accommodation', 'Breakfast', 'Guided tours'],
    image: '/images/zanzibar.jpg',
    rating: 4.9,
    reviewsCount: 200,
    duration: '5 days',
    groupSize: '8-12',
    difficulty: 'Moderate',
    price: 720,
    originalPrice: 1000,
    icon: "MapPin" ,
  },
];

export const mockFlights: FlightDeal[] = [
  {
    id: 'flight1',
    title: 'Nairobi to Dubai',
    description: 'Direct flight from Nairobi to Dubai with Emirates.',
    origin: 'Nairobi',
    destination: 'Dubai',
    airline: 'Emirates',
    duration: '6h 30m',
    stops: 0,
    price: '499',
    date: '2024-07-01',
    image: '/images/dubai.jpg',
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
    id: 'visa2',
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
