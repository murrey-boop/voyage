'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VisaNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gradient CTA button classes
  const ButtonClasses =
    "bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-transform duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none border-0";

return (
  <header
    className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-md'
    }bg-white/70 backdrop-blur-md`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image 
                src="/images/voyage-logo.png" 
                alt="Logo" 
                width={40} 
                height={40}
                className="rounded-full border border-gray-200 shadow-sm"
              />
              <span className="font-bold text-lg text-blue-700">Travel Visa</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/visa/apply" className={ButtonClasses}>
            Apply
          </Link>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen((o) => !o)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu - animated */}
    <div
      className={`md:hidden fixed inset-x-0 top-16 z-40 transition-all duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none -translate-y-4'
      }`}
      style={{
        boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.10)' : 'none',
        background: 'white',
      }}
    >
      <nav className={`px-4 py-4 space-y-3`}>
          <Link href="/visa" className="block text-gray-800 hover:text-blue-500">Home</Link>
          <Link href="/visa/apply" className={ButtonClasses + " block text-center"}>
            Apply
          </Link>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}