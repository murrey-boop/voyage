
export interface Tour {
  id: string;
  title: string;
  region: string;
  category: string;
  price: number;
  duration: string;
  image: string;
}

export const tours: Tour[] = [
  { id: '1', title: 'Safari Adventure', region: 'Africa', category: 'Featured', price: 1200, duration: '5 Days', image: '/images/safari.jpg' },
  { id: '2', title: 'Paris Cultural Tour', region: 'Europe', category: 'Holiday Tours', price: 1500, duration: '7 Days', image: '/images/paris.jpg' },
  { id: '3', title: 'Family Alps Retreat', region: 'Europe', category: 'Family and Friends', price: 1800, duration: '6 Days', image: '/images/alps.jpg' },
  { id: '4', title: 'Zanzibar Beach Escape', region: 'Africa', category: 'Featured', price: 900, duration: '4 Days', image: '/images/zanzibar.jpg' },
  { id: '5', title: 'Tokyo Family Trip', region: 'Asia', category: 'Family and Friends', price: 2000, duration: '8 Days', image: '/images/tokyo.jpg' },
  { id: '6', title: 'Cape Town Holiday', region: 'Africa', category: 'Holiday Tours', price: 1100, duration: '5 Days', image: '/images/cape-town.jpg' },
  { id: '7', title: 'Safari Deluxe', region: 'Africa', category: 'Featured', price: 2500, duration: '7 Days', image: '/images/safari.jpg' },
  { id: '8', title: 'Rome Explorer', region: 'Europe', category: 'Featured', price: 1600, duration: '6 Days', image: '/images/rome.jpg' },
  { id: '9', title: 'Asian Adventure', region: 'Asia', category: 'Holiday Tours', price: 2200, duration: '9 Days', image: '/images/asian-tour.jpg' },
  { id: '10', title: 'Family Safari', region: 'Africa', category: 'Family and Friends', price: 1300, duration: '5 Days', image: '/images/safari.jpg' },
];