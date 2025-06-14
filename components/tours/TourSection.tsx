import React from 'react';
import Link from 'next/link';
import TourCardItem from './TourCardItem';
import { Tour } from '@/types/tours';
import { FlightDeal } from '@/types/flights';
import { VisaPromo } from '@/types/visa';

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

const TourSection: React.FC<TourSectionProps> = ({ type, sectionTitle, items, seeMoreLink }) => {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{sectionTitle}</h2>
        {seeMoreLink && (
          <Link href={seeMoreLink} className="text-blue-600 hover:underline text-sm">
            See all
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <TourCardItem key={item.id} type={type} data={item as any} />
        ))}
      </div>
    </div>
  );
};

export default TourSection;
