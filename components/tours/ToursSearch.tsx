'use client';
import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchParams {
  destination: string;
}

export default function ToursSearch({ onSearch }: { onSearch: (results: SearchParams) => void }) {
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-full shadow-lg w-full max-w-lg mx-auto flex items-center space-x-4">
      <div className="flex items-center w-full">
        <MapPin className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where to? e.g. Paris, Safari..."
          className="w-full p-2 border-none focus:ring-0 font-lato text-sm placeholder-gray-400"
        />
      </div>
      <motion.button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={20} />
        <span>Search</span>
      </motion.button>
    </form>
  );
}