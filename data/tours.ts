export interface Tour {
  id: number;
  title: string;
  image: string;
  location: string;
  price: string;
  description: string;
  reviews?: number;
  people?: number;
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Masai Mara Safari Adventure",
    image: "/images/maasai-mara.jpg",
    location: "Kenya",
    price: "$1,200",
    description: "Experience the great wildebeest migration and Africa's Big Five in Kenya's famous Masai Mara.",
    reviews: 150,
    people: 20,
  },
  {
    id: 2,
    title: "Victoria Falls Explorer",
    image: "/images/london.jpg",
    location: "Zambia/Zimbabwe",
    price: "$950",
    description: "Marvel at the majestic Victoria Falls, one of the world’s largest waterfalls.",
    reviews: 120,
    people: 15,
  },
  {
    id: 3,
    title: "Cape Town City & Wine Tour",
    image: "/images/cape-town.jpg",
    location: "South Africa",
    price: "$1,300",
    description: "Discover Table Mountain, Cape Town's city life, and world-class vineyards.",
    reviews: 100,
    people: 10,
  },
  {
    id: 4,
    title: "Sahara Desert Expedition",
    image: "/images/travel-random.jpg",
    location: "Morocco",
    price: "$1,100",
    description: "Ride camels across the golden dunes and experience Berber hospitality.",
    reviews: 90,
    people: 8,
  },
];