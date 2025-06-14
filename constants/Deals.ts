
export interface FlightDeal {
  id: string;
  title: string;
  description: string;
  price: string;
  origin: string;
  destination: string;
  date: string;
  duration: string;
  stops: number;
  airline: string;
  image: string;
  discountPercentage?: number;
  isStudentDeal?: boolean;
}

export const Deals: FlightDeal[] = [
  {
    id: '1',
    title: 'Nairobi to Zanzibar',
    description: 'Direct flight with 20kg baggage allowance',
    price: 'KSh 12,500',
    origin: 'Nairobi',
    destination: 'Zanzibar',
    date: '2023-12-15',
    duration: '1h 45m',
    stops: 0,
    airline: 'Jambojet',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    discountPercentage: 15,
    isStudentDeal:false
  },
  {
    id: '2',
    title: 'Nairobi to Cape Town',
    description: 'Evening flight with meal included',
    price: 'KSh 24,800',
    origin: 'Nairobi',
    destination: 'Cape Town',
    date: '2023-11-20',
    duration: '4h 30m',
    stops: 1,
    airline: 'Kenya Airways',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isStudentDeal: true
  },
  {
    id: '3',
    title: 'Nairobi to Dubai',
    description: 'Business class upgrade available',
    price: 'KSh 45,200',
    origin: 'Nairobi',
    destination: 'Dubai',
    date: '2024-01-10',
    duration: '5h 15m',
    stops: 0,
    airline: 'Emirates',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1137&q=80',
    discountPercentage: 20,
    isStudentDeal:false
  },
  {
    id: '4',
    title: 'Nairobi to Johannesburg',
    description: 'Early morning flight with free WiFi',
    price: 'KSh 18,300',
    origin: 'Nairobi',
    destination: 'Johannesburg',
    date: '2023-12-05',
    duration: '3h 40m',
    stops: 0,
    airline: 'South African Airways',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isStudentDeal:false
},
  {
    id: '5',
    title: 'Nairobi to London',
    description: 'Overnight flight with entertainment system',
    price: 'KSh 68,900',
    origin: 'Nairobi',
    destination: 'London',
    date: '2024-02-14',
    duration: '8h 30m',
    stops: 1,
    airline: 'British Airways',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    discountPercentage: 10,
    isStudentDeal:false
  },
  {
    id: '6',
    title: 'Nairobi to Paris',
    description: 'Student special with extra baggage',
    price: 'KSh 62,400',
    origin: 'Nairobi',
    destination: 'Paris',
    date: '2024-03-08',
    duration: '9h 10m',
    stops: 1,
    airline: 'Air France',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isStudentDeal: true
  },
  {
    id: '7',
    title: 'Nairobi to New York',
    description: 'Premium economy available',
    price: 'KSh 89,500',
    origin: 'Nairobi',
    destination: 'New York',
    date: '2024-04-22',
    duration: '15h 20m',
    stops: 1,
    airline: 'Delta',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    discountPercentage: 12,
    isStudentDeal:false
  },
  {
    id: '8',
    title: 'Nairobi to Mumbai',
    description: 'Direct flight with vegetarian meal options',
    price: 'KSh 38,700',
    origin: 'Nairobi',
    destination: 'Mumbai',
    date: '2023-11-30',
    duration: '5h 50m',
    stops: 0,
    airline: 'Air India',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isStudentDeal:false
},
  {
    id: '9',
    title: 'Nairobi to Cairo',
    description: 'Weekend getaway special',
    price: 'KSh 32,100',
    origin: 'Nairobi',
    destination: 'Cairo',
    date: '2024-01-05',
    duration: '4h 15m',
    stops: 0,
    airline: 'EgyptAir',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    discountPercentage: 18,
    isStudentDeal: true
  },
  {
    id: '10',
    title: 'Nairobi to Lagos',
    description: 'Business lounge access included',
    price: 'KSh 41,500',
    origin: 'Nairobi',
    destination: 'Lagos',
    date: '2024-02-28',
    duration: '5h 10m',
    stops: 1,
    airline: 'Ethiopian Airlines',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isStudentDeal: true
  }
];