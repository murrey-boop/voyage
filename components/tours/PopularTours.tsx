'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Currency } from '@/constants';

interface Tour {
  id: string;
  title: string;
  region: string;
  category: string;
  price: number;
  duration: string;
  image: string;
}

export default function PopularTours({ tours, currency }: { tours: Tour[]; currency: Currency }) {
  const [filter, setFilter] = useState('Featured');
  const [displayedTours, setDisplayedTours] = useState<Tour[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const filtered = filter === 'Featured' ? tours : tours.filter((tour) => tour.category === filter);
    setDisplayedTours(filtered.slice(0, 8));
  }, [filter, tours]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });
  }, [displayedTours]);

  const handleLoadMore = () => {
    const currentLength = displayedTours.length;
    const moreTours = tours.filter((tour) => filter === 'Featured' || tour.category === filter).slice(currentLength, currentLength + 4);
    setDisplayedTours([...displayedTours, ...moreTours]);
  };

  const convertPrice = (priceInUSD: number) => {
    return Math.round(priceInUSD * currency.rate);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 font-montserrat">
          Popular Tours
        </h1>
        <div className="flex justify-center space-x-4 mb-12">
          {['Featured', 'Family and Friends', 'Holiday Tours'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`py-2 px-4 rounded-lg font-lato text-sm transition duration-300 ${
                filter === category ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTours.map((tour, index) => (
            <article
              key={tour.id}
              ref={(el) => {
                if (el) {
                  cardRefs.current[index] = el as HTMLDivElement;
                }
              }}
              className="p-4 bg-white shadow-sm rounded-lg border border-gray-200 transition duration-300"
            >
              <Image src={tour.image} alt={tour.title} width={200} height={150} className="rounded-t-lg mb-2 object-cover" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 font-montserrat">{tour.title}</h3>
              <p className="text-gray-600 font-lato text-xs sm:text-sm">Region: {tour.region}</p>
              <p className="text-gray-600 font-lato text-xs sm:text-sm">Price: {currency.symbol}{convertPrice(tour.price)}</p>
              <p className="text-gray-600 font-lato text-xs sm:text-sm">Duration: {tour.duration}</p>
              <Link
                href={`/tours/book/${tour.id}`}
                className="mt-2 inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-3 rounded-lg text-xs sm:text-sm transition duration-300"
              >
                Book Now
              </Link>
            </article>
          ))}
        </div>
        {displayedTours.length < tours.filter((tour) => filter === 'Featured' || tour.category === filter).length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}