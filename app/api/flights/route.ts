import { NextResponse } from 'next/server';
import  amadeus  from '@/lib/amadeus';
import { FlightDeal } from '@/types/flights';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin') || 'NBO';
    const destination = searchParams.get('destination') || 'PAR';
    const departureDate = searchParams.get('date') || '2025-12-01';

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: 1,
      max: 2, // Limit to 2 results
    });

    interface AmadeusFlightOffer {
      itineraries: {
        duration: string;
        segments: {
          departure: { iataCode: string; at: string };
          destination: { iataCode: string };
          carrierCode: string;
        }[];
      }[];
      price: { total: string };
    }

    const flights: FlightDeal[] = response.data.map((offer: AmadeusFlightOffer, index: number) => ({
      id: `f${index + 1}`,
      title: `Flight to ${offer.itineraries[0].segments[0].destination.iataCode}`,
      description: `Flight from ${origin} to ${offer.itineraries[0].segments[0].destination.iataCode}`,
      price: offer.price.total,
      origin: offer.itineraries[0].segments[0].departure.iataCode,
      destination: offer.itineraries[0].segments[0].destination.iataCode,
      date: offer.itineraries[0].segments[0].departure.at.split('T')[0],
      duration: offer.itineraries[0].duration.replace('PT', '').toLowerCase(),
      stops: offer.itineraries[0].segments.length - 1,
      airline: offer.itineraries[0].segments[0].carrierCode, // Simplified; can  map to airline name 
      image: `/images/flight${index + 1}.jpg`,
      isStudentDeal: false,
    }));

    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      [
        {
          id: 'f1',
          title: 'Flight to Paris',
          description: 'Affordable flight deal',
          price: '300',
          origin: 'NBO',
          destination: 'PAR',
          date: '2025-12-01',
          duration: '7h',
          stops: 1,
          airline: 'Air France',
          image: '/images/icons/airfrance.jpg',
          isStudentDeal: false,
        },
        {
          id: 'f2',
          title: 'Flight to Singapore',
          description: 'Affordable flight deal',
          price: '300',
          origin: 'NBO',
          destination: 'SQ',
          date: '2025-12-01',
          duration: '8h',
          stops: 1,
          airline: 'Air France',
          image: '/images/icons/singapore.jpg',
          isStudentDeal: false,
        },
        {
          id: 'f2',
          title: 'Flight to London',
          description: 'Great flight deal',
          price: '400',
          origin: 'NBO',
          destination: 'LON',
          date: '2025-12-05',
          duration: '6h',
          stops: 0,
          airline: 'British Airways',
          image: '/images/british-airways.jpg',
          isStudentDeal: false,
        },
      ] as FlightDeal[],
      { status: 200 }
    );
  }
}