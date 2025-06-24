export interface Flight {
  id: number;
  title: string;
  image: string;
  route: string;
  price: string;
  description: string;
  isDirect?: boolean;
  stops?: number;
  hours?: number; // Optional field for flight duration in hours
  departureTime?: string; // Optional field for departure time
}

export const flights: Flight[] = [
  {
    id: 1,
    title: "Nairobi to Cape Town",
    image: "/images/cape-town.jpg",
    route: "Nairobi - Cape Town",
    price: "$400",
    description: "Direct flights from Nairobi to Cape Town with top airlines.",
    isDirect: true,
    stops: 0,
  },
  {
    id: 2,
    title: "Lagos to Johannesburg",
    image: "/images/london.jpg",
    route: "Lagos - Johannesburg",
    price: "$450",
    description: "Affordable return tickets from Lagos to Johannesburg.",
    isDirect: false,
    stops: 1,
  },
  {
    id: 3,
    title: "Cairo to Casablanca",
    image: "/images/qatar2.jpg",
    route: "Cairo - Casablanca",
    price: "$380",
    description: "Convenient flights from Egypt&apos;s capital to Morocco&apos;s gem.",
    isDirect: false,
    stops: 1,
  },
  {
    id: 4,
    title: "Addis Ababa to Victoria Falls",
    image: "/images/Tokyo.jpg",
    route: "Addis Ababa - Victoria Falls",
    price: "$420",
    description: "Explore the wonders of Victoria Falls with direct flights from Addis Ababa.",
    isDirect: true,
    stops: 0,
  },
];