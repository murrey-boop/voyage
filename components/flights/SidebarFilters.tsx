'use client';
import { FlightFilters } from '@/types/flights';
import { useState } from 'react';

type FilterFilters = {
  stops: string[];
  airlines: string[];
  maxDuration: number;
};

export function SidebarFilters({ 
  onFilterChange 
}: {
  // Accept a callback that can take either FilterFilters or FlightFilters
  onFilterChange: (filters: FlightFilters) => void;
}) {
  const [filters, setFilters] = useState<FilterFilters>({
    stops: [],
    airlines: [],
    maxDuration: 24
  });

  // Helper to build FlightFilters from FilterFilters
  const getFlightFilters = (filterState: FilterFilters): FlightFilters => ({
    ...filterState,
    stops: filterState.stops.map(stop => {
      if (stop === 'Non-stop') return 0;
      if (stop === '1 Stop') return 1;
      // For '2+ Stops' or any other, use 2 as a fallback
      return 2;
    }),
    onlyStudentDeals: false // or pass from props/context if needed
  });

  const handleStopChange = (stop: string) => {
    const newStops = filters.stops.includes(stop)
      ? filters.stops.filter(s => s !== stop)
      : [...filters.stops, stop];
    const newFilters = { ...filters, stops: newStops };
    setFilters(newFilters);
    onFilterChange(getFlightFilters(newFilters));
  };

  const handleAirlineChange = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    const newFilters = { ...filters, airlines: newAirlines };
    setFilters(newFilters);
    onFilterChange(getFlightFilters(newFilters));
  };

  const handleMaxDurationChange = (newDuration: number) => {
    const newFilters = { ...filters, maxDuration: newDuration };
    setFilters(newFilters);
    onFilterChange(getFlightFilters(newFilters));
  };

  return (
    <aside className="w-64 p-4 border-r sticky top-0 h-screen overflow-y-auto">
      <h3 className="font-semibold mb-6 text-lg">Refine Deals</h3>
      
      {/* Stops Filter */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Stops</h4>
        {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
          <label key={stop} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.stops.includes(stop)}
              onChange={() => handleStopChange(stop)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            {stop}
          </label>
        ))}
      </div>

      {/* Airlines Filter */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Airlines</h4>
        {['Airline A', 'Airline B', 'Airline C'].map((airline) => (
          <label key={airline} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.airlines.includes(airline)}
              onChange={() => handleAirlineChange(airline)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            {airline}
          </label>
        ))}
      </div>

      {/* Max Duration Filter */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Max Duration (hours)</h4>
        <input
          type="range"
          min="1"
          max="48"
          value={filters.maxDuration}
          onChange={(e) => handleMaxDurationChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="text-sm text-gray-600 mt-2">
          Max {filters.maxDuration} hours
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          const resetFilters: FilterFilters = {
            stops: [],
            airlines: [],
            maxDuration: 24
          };
          setFilters(resetFilters);
          onFilterChange(getFlightFilters(resetFilters));
        }}
        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Reset Filters
      </button>
    </aside>
  );
}