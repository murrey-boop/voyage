
'use client';
//import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

// 
interface TourFilters {
  priceMin: number;
  priceMax: number;
  durations: string[];
  ratings: number[];
  difficulties: string[];
  categories: string[];
  regions: string[];
}

export function TourFilters({
  filters,
  setFilters
}: {
  filters: TourFilters;
  setFilters: (f: TourFilters) => void;
}) {
  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider 
          value={[filters.priceMin, filters.priceMax]}
          max={5000}
          step={100}
          onValueChange={([min, max]: [number, number]) => setFilters({...filters, priceMin: min, priceMax: max })}
        />
        <div className="flex justify-between mt-2">
          <span>${filters.priceMin}</span>
          <span>${filters.priceMax}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Duration</h3>
        {['1-3 days', '4-7 days', '8-14 days', '15+ days'].map(duration => (
          <div key={duration} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`duration-${duration}`}
              checked={filters.durations.includes(duration)}
              onCheckedChange={(checked) => {
                setFilters({
                  ...filters,
                  durations: checked
                    ? [...filters.durations, duration]
                    : filters.durations.filter(d => d !== duration)
                });
              }}
            />
            <label htmlFor={`duration-${duration}`}>{duration}</label>
          </div>
        ))}
      </div>

      {/* Add similar sections for Rating, Difficulty, etc */}
    </div>
  );
}