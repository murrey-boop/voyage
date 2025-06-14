export interface Flight {
  id: string;
  city: string;
  country: string;
  price: number;
  airline: string;
  airlineLogo: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  stops: number;
  image: string;
  width: number;  
  height: number; 
  isStudentDeal?: boolean;
  studentDiscount?: number;
  universityNearby?: string;
  flightNumber?: string; 
  flightCode?: string; 
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  travelers?: number;
  isStudent?: boolean;
  dates:[Date | null, Date | null]; // [departureDate, returnDate]
}
export interface FlightSearchFormProps {
  onSearch: (params: FlightSearchParams) => void;
  isStudentView?: boolean;
}
export interface FlightCardsProps {
  flights: Flight[];
  isStudentView?: boolean;
  section?: string; 
  // Add if needed for other sections
}

export interface FlightFilters {
  stops: number[]; // [0, 1, 2] for non-stop, 1 stop, 2+ stops
  airlines: string[];
  maxDuration: number;
  onlyStudentDeals: boolean;
  [key: string]: string | number | boolean | string[] | number[] | [number, number] | undefined; // For additional filters
  // e.g., price range, departure time, etc.
  priceRange?: [number, number]; // Optional price range filter
  departureTime?: string; // Optional departure time filter
  arrivalTime?: string; // Optional arrival time filter
 // dateRange?: [Date, Date]; // Optional date range filter
  origin?: string; // Optional origin filter
  destination?: string; // Optional destination filter
  date?: string; // Optional date filter
  }

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
  isStudentDeal?: boolean;
  discountPercentage?: number;
}