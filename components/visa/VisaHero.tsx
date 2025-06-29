'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react'; // <-- Import the icon

const visaTypes = ['Tourist', 'Business', 'Student'];
const countries = ['UAE', 'Australia', 'Kenya', 'Morrocco', 'Egypt','Oman','Germany', 'South Africa', 'Canada','USA']; // TODO : Add more countries

export default function VisaHero() {
  const router = useRouter();
  const [visaType, setVisaType] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    gsap.fromTo(
      '.visa-hero-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.visa-search-form',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleSearch = () => {
    if (visaType && country) {
      router.push(`/visa/apply?type=${visaType.toLowerCase()}&country=${country.toLowerCase()}`);
    } else {
      alert('Please select both visa type and country.');
    }
  };

  return (
    <section className="relative h-[500px] flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* --- Overlay Layer --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/visa-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black opacity-70" /> {/* Stronger overlay */}
      </div>

      <div className="relative z-20 text-center visa-hero-text mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hassle-Free Visa Services</h1>
        <p className="text-lg md:text-xl">
          Travel the world with ease—let us handle your visa applications.
        </p>
      </div>

      {/* Search Form */}
      <div className="relative z-20 visa-search-form bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:space-x-4 w-full md:w-[75%] max-w-4xl md:max-w-2xl">
        <select
          value={visaType}
          onChange={(e) => setVisaType(e.target.value)}
          className="w-full md:w-1/3 p-2 rounded border mb-4 md:mb-0 text-gray-900"
        >
          <option value="">Select Visa Type</option>
          {visaTypes.map((type) => (
            <option key={type} value={type}>{type} Visa</option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full md:w-1/3 p-2 rounded border mb-4 md:mb-0 text-gray-900"
        >
          <option value="">Select Country</option>
          {countries.map((cty) => (
            <option key={cty} value={cty}>{cty}</option>
          ))}
        </select>

        <Button
          onClick={handleSearch}
          className="w-full md:w-1/3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center"
        >
          Apply Now
          <ArrowRight className="ml-2 animate-bounce" size={20} />
        </Button>
      </div>
    </section>
  );
}