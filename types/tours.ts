

export type Tour={
  id: string;
  name: string;
  title: string; //  for compatibility
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  duration: string; 
  difficulty?: 'Easy' | 'Moderate' | 'Challenging'| 'Hard';
  location: string;
  category: string[];
  departureDate?: string;
  returnDate?: string;
  highlights: string[];
  includes: string[];
  reviewsCount: number;
  currency?:string; // Optional, if you want to store currency
  guide?: string; // Optional, if you want to store guide information
  icon?:'MapPin' | 'Mountain';
  groupSize?:string;
  isFavorite?: boolean;
  description?: string;
  durationDays?: number; 
  availability?: {
    [date: string]: {
      available: boolean;
      price: number;
    };
  };
}

