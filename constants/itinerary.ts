export interface Booking {
  id: string;
  destination: string;
  dates: { start: string; end: string };
  status: 'confirmed' | 'canceled' | 'pending';
  totalCost: number;
}

export interface TravelHistory {
  id: string;
  name: string;
  destination: string;
  dates: { start: string; end: string };
  photos: string[];
  rating: number;
}

export interface Itinerary {
  id: string;
  destination: string;
  dates: { start: string; end: string };
  activities: { day: number; description: string }[];
  accommodation: string;
  assistance: string[];
  coordinates: { lat: number; lng: number };
}

export const bookings: Booking[] = [
  {
    id: 'B001',
    destination: 'Maasai Mara',
    dates: { start: '2025-06-12', end: '2025-06-17' },
    status: 'confirmed',
    totalCost: 5000,
  },
  {
    id: 'B002',
    destination: 'Paris',
    dates: { start: '2025-07-01', end: '2025-07-08' },
    status: 'pending',
    totalCost: 7000,
  },
];

export const travelHistory: TravelHistory[] = [
  {
    id: 'T001',
    name: 'Safari Adventure',
    destination: 'Zanzibar',
    dates: { start: '2025-04-01', end: '2025-04-05' },
    photos: [],
    rating: 4,
  },
];

export const itineraries: Itinerary[] = [
  {
    id: 'I001',
    destination: 'Maasai Mara',
    dates: { start: '2025-06-12', end: '2025-06-17' },
    activities: [
      { day: 1, description: 'Arrival and welcome dinner' },
      { day: 2, description: 'Morning safari in Maasai Mara' },
    ],
    accommodation: 'Mara Lodge',
    assistance: ['Guided Tours', 'Transportation'],
    coordinates: { lat: -1.4062, lng: 35.0102 }, // Maasai Mara coordinates
  },
];