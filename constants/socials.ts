

export const SOCIAL_LINKS = {
  whatsapp: {
    url: 'https://wa.me/254743524370', 
    icon: '/icons/whatsapp.svg',
    label: 'Chat on WhatsApp',
    width : 24,
    height : 24
  },
  facebook: {
    url: 'https://web.facebook.com/profile.php?id=100089526312677', bg: 'bg-blue-600',
    icon: '/icons/facebook.svg',
    label: 'Follow on Facebook'
  },
  instagram: {
    url: 'https://instagram.com/digitalvoyage',
    icon: '/icons/instagram.svg',
    label: 'Follow on Instagram'
  },
  twitter: {
    url: 'https://twitter.com/digitalvoyage',
    icon: '/icons/twitter.svg',
    label: 'Twitter'
  }
};

export const bookings={
  tours: [
    {
      id: 'tour1',
      name: 'Safari Adventure',
      date: '2025-01-15',
      destination: 'Maasai Mara',
      price: 1200,
      status: 'confirmed'
    },
    {
      id: 'tour2',
      name: 'Beach Getaway',
      date: '2025-02-20',
      destination: 'Diani Beach',
      price: 800,
      status: 'pending'
    }
  ],
  flights: [
    {
      id: 'flight1',
      flightNumber: 'AF123',
      date: '2025-03-10',
      origin: 'Nairobi',
      destination: 'Paris',
      price: 500,
      status: 'confirmed'
    },
    {
      id: 'flight2',
      flightNumber: 'BA456',
      date: '2025-04-05',
      origin: 'Nairobi',
      destination: 'London',
      price: 600,
      status: 'cancelled'
    }
  ]
}