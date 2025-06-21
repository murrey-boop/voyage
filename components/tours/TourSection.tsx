import React from 'react';
import Link from 'next/link';
import TourCardItem from './TourCardItem';
import { Tour } from '@/data/tours';
import { FlightDeal } from '@/types/flights';
import { VisaPromo } from '@/types/visa';

/**
 * Props type covering all section variants.
 * Passes real data objects for each type of deal.
 */
type TourSectionProps =
  | {
      type: 'tours';
      sectionTitle: string;
      items: Tour[];
      seeMoreLink?: string;
    }
  | {
      type: 'flights';
      sectionTitle: string;
      items: FlightDeal[];
      seeMoreLink?: string;
    }
  | {
      type: 'visas';
      sectionTitle: string;
      items: VisaPromo[];
      seeMoreLink?: string;
    };

/**
 * TourSection displays a section with a heading, a "See all" link,
 * and a responsive grid of cards for tours, flights, or visas.
 */
const TourSection: React.FC<TourSectionProps> = ({
  type,
  sectionTitle,
  items,
  seeMoreLink,
}) => {
  return (
    <section
      className="mb-16"
      aria-labelledby={`section-title-${type}`}
      role="region"
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          id={`section-title-${type}`}
          className="text-2xl font-semibold text-gray-800 dark:text-yellow-200"
        >
          {sectionTitle}
        </h2>
        {seeMoreLink && (
          <Link
            href={seeMoreLink}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            See all
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.length ? (
          items.map((item) => (
            <TourCardItem
              key={item.id}
              type={type}
              data={item}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No {type} available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default TourSection;