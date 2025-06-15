// components/FlightSearchForm.tsx
'use client';
import { useRouter } from 'next/navigation';
import { FlightSearchParams } from '@/types/flights';

export default function FlightSearchForm({
  initialValues
}: {
  initialValues: Partial<FlightSearchParams>
}) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const params = new URLSearchParams();
    
    ['origin', 'destination', 'dates'].forEach(field => {
      if (formData.get(field)) {
        params.set(field, formData.get(field) as string);
      }
    });

    router.push(`/flights/deals?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            name="origin"
            defaultValue={initialValues.origin || ''}
            className="w-full p-2 border rounded-md"
            placeholder="City or Airport"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input
            name="destination"
            defaultValue={initialValues.destination || ''}
            className="w-full p-2 border rounded-md"
            placeholder="City or Airport"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
          <input
            type="date"
            name="dates"
            defaultValue={initialValues.dates || ''}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <button 
        type="submit"
        className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors"
      >
        Search Deals
      </button>
    </form>
  );
}