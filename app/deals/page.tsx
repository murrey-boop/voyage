'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import  FlightSearchForm  from '@/components/flights/FlightSearchForm';
import { SidebarFilters } from '@/components/flights/SidebarFilters';
import { DealCard } from '@/components/DealCard';
import { FlightFilters, FlightDeal } from '@/types/flights';
import { fetchFlightDeals } from '@/lib/flightDeals';
import { useWishlist } from '@/components/WishlistProvider';
import { Deals } from '@/constants/Deals';


export default function DealsPage() {
  const routerSearchParams = useSearchParams();
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<FlightDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  


  // fetch deals on mount and when search params change
  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      try {
        const fetchedDeals = await fetchFlightDeals({
          origin: routerSearchParams.get('origin') || undefined,
          destination: routerSearchParams.get('destination') || undefined,
          dates: routerSearchParams.get('dates') || undefined
        });
        setDeals(fetchedDeals);
        setFilteredDeals(fetchedDeals);
      } catch (error) {
        console.error('Using fallback data:', error);

        const filteredLocalDeals: FlightDeal[] = (Deals as FlightDeal[]).filter((deal: FlightDeal) => {
          const matchesOrigin: boolean = !routerSearchParams.get('origin') || 
            deal.origin.toLowerCase().includes(routerSearchParams.get('origin')!.toLowerCase());
          const matchesDestination: boolean = !routerSearchParams.get('destination') || 
            deal.destination.toLowerCase().includes(routerSearchParams.get('destination')!.toLowerCase());
          const matchesDate: boolean = !routerSearchParams.get('dates') || deal.date === routerSearchParams.get('dates');
          
          return matchesOrigin && matchesDestination && matchesDate;
        });
        setDeals(filteredLocalDeals);
        setFilteredDeals(filteredLocalDeals);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [routerSearchParams]);

  // Apply filters when they change
  const applyFilters = (filters: FlightFilters) => {
    const filtered = deals.filter(deal => {
      const price = parseInt(deal.price.replace(/\D/g, ''));
      return (
        (filters.stops.length === 0 || filters.stops.includes(deal.stops)) &&
        (filters.airlines.length === 0 || filters.airlines.includes(deal.airline)) &&
        (parseInt(deal.duration) <= filters.maxDuration) &&
        (!filters.onlyStudentDeals || deal.isStudentDeal) &&
        (filters.priceRange !== undefined
          ? price >= filters.priceRange[0] && price <= filters.priceRange[1]
          : true)
      );
    });
    setFilteredDeals(filtered);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Filter Button */}
      <button 
        onClick={() => setMobileFiltersOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-teal-600 text-white p-3 rounded-full shadow-lg z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block fixed md:relative inset-0 z-20 bg-white md:bg-transparent`}>
          <div className="absolute top-0 right-0 p-4 md:hidden">
            <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SidebarFilters onFilterChange={applyFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <FlightSearchForm initialValues={{
            from: routerSearchParams.get('origin') || '',
            to: routerSearchParams.get('destination') || '',
            dates: (() => {
              const datesParam = routerSearchParams.get('dates');
              if (!datesParam) return [null, null];
              const [start, end] = datesParam.split(',');
              return [
                start ? new Date(start) : null,
                end ? new Date(end) : null
              ];
            })()
          }} />
          
          {/* Results Count */}
          <div className="mt-6 mb-4">
            <h2 className="text-xl font-semibold">
              {filteredDeals.length} {filteredDeals.length === 1 ? 'Deal' : 'Deals'} Found
            </h2>
            {routerSearchParams.get('origin') && routerSearchParams.get('destination') && (
              <p className="text-gray-600">
                {routerSearchParams.get('origin')} → {routerSearchParams.get('destination')}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Deals Grid */}
              {filteredDeals.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDeals.map((deal) => (
                    <DealCard 
                      key={deal.id} 
                      deal={deal}
                      isSaved={isInWishlist(deal.id)}
                      onSave={() => toggleWishlist(deal.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No deals match your filters</h3>
                  <p className="mt-2 text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}



