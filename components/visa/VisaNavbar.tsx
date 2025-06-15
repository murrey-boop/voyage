'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VisaNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={40} 
                height={40}
                className='rounded-full'
                />
                <span className="font-bold text-lg text-blue-700">Travel Visa</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/visa/apply" className="hover:text-blue-500 transition">Apply</Link>
            <Link href="/visa/services" className="hover:text-blue-500 transition">Services</Link>
            <Link href="/visa/contact" className="hover:text-blue-500 transition">Contact</Link>
            <Button variant="outline" asChild>
              <Link href="/auth/signIn">Login</Link>
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/visa" className="block text-gray-800 hover:text-blue-500">Home</Link>
            <Link href="/visa/apply" className="block text-gray-800 hover:text-blue-500">Apply</Link>
            <Link href="/visa/services" className="block text-gray-800 hover:text-blue-500">Services</Link>
            <Link href="/visa/contact" className="block text-gray-800 hover:text-blue-500">Contact</Link>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
