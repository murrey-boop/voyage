export interface Visa {
  id: number;
  title: string;
  image: string;
  country: string;
  price: string;
  description: string;
  validity?: string; // Optional field for visa validity
  processingTime?: string; // Optional field for processing time
}

export const visas: Visa[] = [
  {
    id: 1,
    title: "Kenya Tourist Visa",
    image: "/images/nairobi.jpg",
    country: "Kenya",
    price: "$50",
    description: "Easy online application for Kenya tourist visas for all travelers.",
    validity: "90 days", // Optional field for visa validity
  },
  {
    id: 2,
    title: "Egypt Entry Visa",
    image: "/images/santorini.jpg",
    country: "Egypt",
    price: "$60",
    description: "Quick approval for Egypt&apos;s single and multiple-entry visas.",
    validity: "30 days",
  },
  {
    id: 3,
    title: "South Africa Visitor Visa",
    image: "/images/cape-town.jpg",
    country: "South Africa",
    price: "$70",
    description: "Hassle-free visitor visa services for South Africa.",
    validity: "60 days",
  },
  {
    id: 4,
    title: "Morocco Tourist Visa",
    image: "/images/sydney.jpg",
    country: "Morocco",
    price: "$40",
    description: "Fast-track your Morocco tourist visa with minimal paperwork.",
    validity: "90 days",
  },
];