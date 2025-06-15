
import { Deals } from '@/constants/Deals';
import { FlightDeal } from '@/types/flights';
import { trackError } from '@/lib/analytics';


// Cache setup
const DEALS_CACHE = new Map<string, {
  data: FlightDeal[];
  timestamp: number;
}>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache duration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second initial delay


    interface Segment {
      departure?: { iataCode?: string; at?: string };
      arrival?: { iataCode?: string; at?: string };
      carrierCode?: string;
      duration?: string;
    }
     

    interface ApiFlightDeal {
      id?: string;
      destination: string;
      price?: { total?: number };
      departureDate?: string;
      duration?: string;
      itineraries?: { segments?: Segment[] }[];
      validatingAirlineCodes?: string[];
    }
// Enhanced fetch with retry logic
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
}

function loadPersistentCache() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('flightDealsCache');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        for (const [key, value] of Object.entries(parsed)) {
          const typedValue = value as { data: FlightDeal[]; timestamp: number };
          if (now - typedValue.timestamp < CACHE_TTL) {
            DEALS_CACHE.set(key, typedValue);
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        localStorage.removeItem('flightDealsCache');
      }
    }
  }
}

function savePersistentCache() {
  if (typeof window !== 'undefined') {
    const toSave = Object.fromEntries(DEALS_CACHE.entries());
    localStorage.setItem('flightDealsCache', JSON.stringify(toSave));
  }
}

// Initialize cache when module loads
loadPersistentCache();


export async function fetchFlightDeals(params: {
  origin?: string;
  destination?: string;
  dates?: string;
}): Promise<FlightDeal[]> {
  const cacheKey = JSON.stringify(params);
  const cached = DEALS_CACHE.get(cacheKey);
  
  // Return cached data if available and not expired
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
     // Try Amadeus API with retry logic
    const response = await fetchWithRetry(
      `/api/flights?origin=${params.origin || 'NBO'}` +
      `${params.destination ? `&destination=${params.destination}` : ''}` +
      `${params.dates ? `&dates=${params.dates}` : ''}`
    );
    
    if (!response.ok) 
      throw new Error('API failed with status ' + response.status);
    // Check if the response is empty
    if (response.status === 204) throw new Error('No content returned from API');
  
      
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No results');
    
      // Transform API data to match FlightDeal type
    
    const formattedDeals = data.map((item: ApiFlightDeal) => ({
      id: item.id || Math.random().toString(36).substring(2, 9),
      title: `${params.origin || 'NBO'} to ${item.destination}`,
      description: `Flight from ${params.origin || 'NBO'} to ${item.destination} on ${item.departureDate || new Date().toISOString().split('T')[0]}`,
      price: `KSh ${item.price?.total || 'N/A'}`,
      origin: params.origin || 'NBO',
      destination: item.destination,
      date: item.departureDate || new Date().toISOString().split('T')[0],
      duration: formatDuration(item.duration ?? ''),
      stops: ((item.itineraries?.[0]?.segments?.length ?? 1) - 1) || 0,
      airline: item.validatingAirlineCodes?.[0] || 'Unknown',
      image: getDestinationImage(item.destination),
      isStudentDeal: item.price?.total !== undefined && item.price.total < 30000,
      discountPercentage: calculateDiscountPercentage(item.price?.total)
    }));
    
    //  cache update
    DEALS_CACHE.set(cacheKey, {
      data: formattedDeals,
      timestamp: Date.now()
    });
    savePersistentCache();


    return formattedDeals;
  } catch (error) {
    trackError(error as Error, 'fetchFlightDeals', { params });
    console.error('Using fallback data:', error);

    // Fallback to local deals filtered by params
    const filteredDeals= Deals.filter((deal: FlightDeal) => {
      const matchesOrigin: boolean = !params.origin || 
        deal.origin.toLowerCase().includes(params.origin.toLowerCase());
      const matchesDestination: boolean = !params.destination || 
        deal.destination.toLowerCase().includes(params.destination.toLowerCase());
      const matchesDate: boolean = !params.dates || deal.date === params.dates;
      
      return matchesOrigin && matchesDestination && matchesDate;
    });
    return filteredDeals;
  }
}

// Helper functions
function formatDuration(duration: string): string {
  if (!duration) return 'N/A';
  // like, converting "PT7H30M" to "7h 30m"
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return duration;
  const hours = match[1] ? match[1].replace('H', 'h ') : '';
  const minutes = match[2] ? match[2].replace('M', 'm') : '';
  return `${hours}${minutes}`.trim() || duration;
}

  // Returns a representative image URL for a given destination IATA code or city name
  function getDestinationImage(destination: string): string {
    // Simple mapping for demo purposes; in production, use a more robust solution or CDN
    const images: Record<string, string> = {
      'LON': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // London
      'NYC': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // New York
      'PAR': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', // Paris
      'DXB': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80', // Dubai
      'NBO': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', // Nairobi
      'BKK': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80', // Bangkok
      'TYO': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', // Tokyo
      'SYD': 'https://images.unsplash.com/photo-1506976785307-8732b6de2045?auto=format&fit=crop&w=600&q=80', // Sydney
      'ZNZ': 'https://images.unsplash.com/photo-1566073771259-6a8506099945', // Zanzibar
      'CPT': 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57', // Cape Town
      'JNB': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // Johannesburg
      'MUM': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be', // Mumbai
      'CAI': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a', // Cairo
      'LOS': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df'  // Lagos
    };

    // Try to match by IATA code (uppercase)
    const code = destination && destination.length === 3 ? destination.toUpperCase() : null;
    if (code && images[code]) return images[code];
    if (destination && images[destination]) return images[destination];


  // Try to match by city name
  const cityImages: Record<string, string> = {
    'london': images['LON'],
    'new york': images['NYC'],
    'paris': images['PAR'],
    'dubai': images['DXB'],
    'nairobi': images['NBO'],
    'bangkok': images['BKK'],
    'tokyo': images['TYO'],
    'sydney': images['SYD'],
    'zanzibar': images['ZNZ'],
    'cape town': images['CPT'],
    'johannesburg': images['JNB'],
    'mumbai': images['MUM'],
    'cairo': images['CAI'],
    'lagos': images['LOS']
  };

  const cityMatch = cityImages[destination.toLowerCase()];
  if (cityMatch) return cityMatch;



    //  generic travel image as fallback
    return 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80';
  }

  
// (Removed duplicate DEALS_CACHE and CACHE_TTL declarations and duplicate loadPersistentCache function)
function calculateDiscountPercentage(total: number | undefined): number | undefined {
  if (typeof total !== 'number' || isNaN(total)) return undefined;
  // Assume a base price of 40000 for discount calculation
  const basePrice = 40000;
  if (total >= basePrice) return 0;
  const discount = ((basePrice - total) / basePrice) * 100;
  return Math.round(discount);
}


