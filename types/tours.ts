

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
  icon?:'MapPin' | 'Mountain';
  groupSize?:string;
  isFavorite?: boolean;
}

