
'use client';
import { useState } from 'react';

type FilterFilters = {
  stops: string[];
  airlines: string[];
  maxDuration: number;
};

export function SidebarFilters({ 
  onFilterChange 
}: {
  onFilterChange: (filters: FilterFilters) => void;
}) {
  const [filters, setFilters] = useState<FilterFilters>({
    stops: [],
    airlines: [],
    maxDuration: 24
  });

  const handleStopChange = (stop: string) => {
    const newStops = filters.stops.includes(stop)
      ? filters.stops.filter(s => s !== stop)
      : [...filters.stops, stop];
    
    const newFilters = { ...filters, stops: newStops };
    setFilters(newFilters);
    onFilterChange(newFilters);
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

      {/* Airlines Filter (similar structure) */}
        <div className="mb-8">
            <h4 className="font-medium mb-3">Airlines</h4>
            {['Airline A', 'Airline B', 'Airline C'].map((airline) => (
            <label key={airline} className="flex items-center mb-2">
                <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => {
                    const newAirlines = filters.airlines.includes(airline)
                    ? filters.airlines.filter(a => a !== airline)
                    : [...filters.airlines, airline];
                    
                    const newFilters = { ...filters, airlines: newAirlines };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                }}
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
            onChange={(e) => {
                const newDuration = parseInt(e.target.value, 10);
                const newFilters = { ...filters, maxDuration: newDuration };
                setFilters(newFilters);
                onFilterChange(newFilters);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="text-sm text-gray-600 mt-2">
            Max {filters.maxDuration} hours
            </div>
        </div>
      {/* Duration Slider */}
        <div className="mb-8">
            <h4 className="font-medium mb-3">Max Duration</h4>
            <input
            type="range"
            min="1"
            max="24"
            value={filters.maxDuration}
            onChange={(e) => {
                const newDuration = parseInt(e.target.value, 10);
                const newFilters = { ...filters, maxDuration: newDuration };
                setFilters(newFilters);
                onFilterChange(newFilters);
            }}
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
            onFilterChange(resetFilters);
            }}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
            Reset Filters
        </button>
    </aside>
  );
}