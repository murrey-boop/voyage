'use client';
import { useEffect, useState } from 'react';
import ToursSearch from './ToursSearch';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SearchParams {
  destination: string;
}

export default function ToursHero({ onSearch }: { onSearch: (results: SearchParams) => void }) {
  const words = ['Journeys', 'Adventures', 'Escapes', 'Wonders'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, [words.length]);

  return (
    <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/travel-bg.jpg"
        alt="Travel Background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 font-montserrat">
          Discover Amazing Travel{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWord}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-teal-300"
            >
              {words[currentWord]}
            </motion.span>
          </AnimatePresence>
        </h1>
        <ToursSearch onSearch={onSearch} />
      </div>
    </section>
  );
}