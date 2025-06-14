

export interface Tour {
  name: string;
  image: string;
  icon: 'MapPin' | 'Mountain';
  rating: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export interface Destination {
  name: string;
  image: string;
  overlayImage: string;
}



export const navLinks = [
  { href: '/tours', label: 'Tours' },
  { href: '/visa', label: 'Visa' },
  { href: '/flights', label: 'Flights' },
  { href: '/itinerary', label: 'Itinerary' },
  { href: '/contact', label: 'Contact' }
];

export const modalContent = {
  '/tours': [
    { title: 'Top Destinations', href: '/tours/destinations', description: 'Explore popular travel spots.' },
    { title: 'Top Bookings', href: '/tours/bookings', description: 'View highly booked tours.' },
    { title: 'All Tours', href: '/tours/all', description: 'See the full tour list.' },
  ],
  '/visa': [
    { title: 'Apply for Visa', href: '/visa/apply', description: 'Start your visa application.' },
    { title: 'Visa Requirements', href: '/visa/services', description: 'Learn what you need.' },
    { title: 'Track Application', href: '/visa/applyStatus', description: 'Monitor your visa status.' },
  ],
  '/flights': [
    { title: 'Search Flights', href: '/flights/search', description: 'Find the best flight deals.' },
    { title: 'Flight Status', href: '/flights/status', description: 'Check your flight status.' },
    { title: 'Book Flights', href: '/flights/book', description: 'Reserve your flight now.' },
  ],
  '/itinerary': [
    { title: 'Booking History', href: '/itinerary/history', description: 'View your past bookings.' },
    { title: 'Itinerary Planner', href: '/itinerary/planner', description: 'Plan your next trip.' },
    { title: 'Travel History', href: '/itinerary/history/tours', description: 'See your tour history.' },
  ],
  '/contact': [
    { title: 'Contact Us', href: '/contact', description: 'Get in touch with our team.' },
    { title: 'Support', href: '/contact/support', description: 'Need help? Contact support.' },
    { title: 'Feedback', href: '/contact/feedback', description: 'Share your thoughts.' },
  ],
};

export const tours = {
  topDestinations: [
    { name: 'Mombasa', id: 'mombasa', image: '/images/mombasa.jpg', icon: 'MapPin', rating: '★★★★☆' },
    { name: 'Nairobi', id: 'nairobi', image: '/images/nairobi.jpg', icon: 'MapPin', rating: '★★★★☆' },
    { name: 'Tokyo', id: 'tokyo', image: '/images/tokyo.jpg', icon: 'MapPin', rating: '★★★★★' },
    { name: 'Paris', id: 'paris', image: '/images/paris.jpg', icon: 'MapPin', rating: '★★★★★' },
  ].map(tour => ({
    ...tour,
    id: tour.id || generateId(tour.name) // Fallback ID generator
  })),
  topBookings: [
    { name: 'Safari Adventure', id: 'safari', image: '/images/safari.jpg', icon: 'Mountain', rating: '★★★★☆' },
    { name: 'New York', id: 'new-york', image: '/images/new-york.jpg', icon: 'MapPin', rating: '★★★★☆' },
    { name: 'Nairobi', id: 'nairobi', image: '/images/nairobi.jpg', icon: 'MapPin', rating: '★★★★☆' },
    { name: 'Mombasa', id: 'mombasa', image: '/images/mombasa.jpg', icon: 'MapPin', rating: '★★★★☆' },
  ].map(bookings=>({
    ...bookings,
    id: bookings.id || generateId(bookings.name)
  })),
  topTours: [
    { title: 'Paris', id: 'paris', image: '/images/paris.jpg', icon: 'MapPin', rating: '★★★★★' },
    { title: 'Tokyo', id: 'tokyo', image: '/images/tokyo.jpg', icon: 'MapPin', rating: '★★★★★' },
    { title: 'Safari Adventure', id: 'safari', image: '/images/safari.jpg', icon: 'Mountain', rating: '★★★★☆' },
    { title: 'New York', id: 'new-york', image: '/images/new-york.jpg', icon: 'MapPin', rating: '★★★★☆' },
  ].map(tour => ({
    ...tour,
    id: tour.id || generateId(tour.title) 
  })),
};

function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing hyphens
}

