

export interface Destination {
  name: string;
  image: string;
  overlayImage: string;
}

export const destinations: Destination[] = [
  { name: 'Maasai Mara', image: '/images/maasai-mara.jpg', overlayImage: '/images/people-enjoying-1.jpg' },
  { name: 'Paris', image: '/images/paris.jpg', overlayImage: '/images/people-enjoying-8.jpg' },
  { name: 'Zanzibar', image: '/images/zanzibar.jpg', overlayImage: '/images/people-enjoying-3.jpg' },
  { name: 'Alps', image: '/images/alps.jpg', overlayImage: '/images/people-enjoying-4.jpg' },
  { name: 'Santorini', image: '/images/santorini.jpg', overlayImage: '/images/people-enjoying-5.jpg' },
  { name: 'New York', image: '/images/new-york.jpg', overlayImage: '/images/people-enjoying-6.jpg' },
  { name: 'Tokyo', image: '/images/tokyo.jpg', overlayImage: '/images/people-enjoying-7.jpg' },
  { name: 'Cape Town', image: '/images/cape-town.jpg', overlayImage: '/images/people-enjoying-8.jpg' },
];