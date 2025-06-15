'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchParams {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  travelers: number;
}

export default function FlightSearch({ onSearch }: { onSearch: (results: SearchParams) => void }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [travelers, setTravelers] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locations = [
    'Doha (DOH)', 'New York (JFK)', 'Dubai (DXB)', 'London (LHR)', 'Nairobi (NBO)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, departureDate, returnDate, travelers });
  };

  const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-1/4">
        <label htmlFor="from" className="block text-sm font-lato text-gray-700 mb-1">From</label>
        <input
          type="text"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Enter city or airport"
          className="w-full p-2 border rounded-lg font-lato text-sm"
          list="from-locations"
        />
        <datalist id="from-locations">
          {locations.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
      </div>
      <div className="w-full sm:w-1/4">
        <label htmlFor="to" className="block text-sm font-lato text-gray-700 mb-1">To</label>
        <input
          type="text"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Enter city or airport"
          className="w-full p-2 border rounded-lg font-lato text-sm"
          list="to-locations"
        />
        <datalist id="to-locations">
          {locations.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
      </div>
      <div className="w-full sm:w-1/6">
        <label htmlFor="departure" className="block text-sm font-lato text-gray-700 mb-1">Departure</label>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          className="w-full p-2 border rounded-lg font-lato text-sm"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          minDate={new Date()}
          maxDate={maxDate}
        />
      </div>
      <div className="w-full sm:w-1/6">
        <label htmlFor="return" className="block text-sm font-lato text-gray-700 mb-1">Return</label>
        <DatePicker
          selected={returnDate}
          onChange={(date) => setReturnDate(date)}
          className="w-full p-2 border rounded-lg font-lato text-sm"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          minDate={new Date()}
          maxDate={maxDate}
        />
      </div>
      <div className="w-full sm:w-1/6 relative" ref={dropdownRef}>
        <label htmlFor="travelers" className="block text-sm font-lato text-gray-700 mb-1">Travelers</label>
        <div
          className="w-full p-2 border rounded-lg font-lato text-sm flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {travelers}
          <ChevronDown size={16} />
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setTravelers(num);
                  setIsOpen(false);
                }}
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 mt-4 sm:mt-0 flex items-center justify-center space-x-2"
      >
        <Search size={20} />
        <span>Search Flights</span>
      </button>
    </form>
  );
}