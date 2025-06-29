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
  featured?: boolean;
}

export default function PopularTours({ tours, currency }: { tours: Tour[]; currency: Currency }) {
  const [filter, setFilter] = useState('Featured');
  const [displayedTours, setDisplayedTours] = useState<Tour[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let filtered = filter === 'Featured' ? tours : tours.filter((tour) => tour.category === filter);

    // Fill up to 4 cards if not enough in the selected category
    if (filtered.length < 4) {
      // Add from other tours that are not in filtered
      const extraTours = tours.filter(
        (tour) => !filtered.some((ft) => ft.id === tour.id)
      );
      filtered = [...filtered, ...extraTours.slice(0, 4 - filtered.length)];
    }
    setDisplayedTours(filtered.slice(0, 8));
  }, [filter, tours]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out' }
        );
      }
    });
  }, [displayedTours]);

  const handleLoadMore = () => {
    const currentLength = displayedTours.length;
    let filtered = filter === 'Featured' ? tours : tours.filter((tour) => tour.category === filter);
    // Fill up to 4 cards if not enough in the selected category
    if (filtered.length < 4) {
      const extraTours = tours.filter(
        (tour) => !filtered.some((ft) => ft.id === tour.id)
      );
      filtered = [...filtered, ...extraTours.slice(0, 4 - filtered.length)];
    }
    const moreTours = filtered.slice(currentLength, currentLength + 4);
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
              ref={el => (cardRefs.current[index] = el)}
              className="p-4 bg-white shadow-md rounded-xl border border-gray-200 transition duration-300 overflow-hidden flex flex-col"
              style={{ minHeight: 330 }}
            >
              <div className="relative w-full aspect-[4/3] mb-3 rounded-md overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 4}
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 font-inter">{tour.title}</h3>
              <p className="text-gray-600 font-inter text-xs sm:text-sm">Region: {tour.region}</p>
              <p className="text-gray-600 font-inter text-xs sm:text-sm">Price: {currency.symbol}{convertPrice(tour.price)}</p>
              <p className="text-gray-600 font-inter text-xs sm:text-sm mb-2">Duration: {tour.duration}</p>
              <Link
                href={`/booking}`}
                className="mt-auto inline-block bg-teal-500 hover:bg-teal-600 text-white text-center font-semibold py-1.5 px-4 rounded-lg text-xs sm:text-sm transition duration-300"
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