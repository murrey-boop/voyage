'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  return (
    <footer
      className="w-full py-12 bg-gradient-to-br from-blue-500/80 to-gray-900 text-white font-inter"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm mb-4">
              Digital Voyage offers tours, visas, flights, and itineraries for unforgettable travel experiences.
            </p>
            <Link href="/OurStory">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
                aria-label="Read our story"
              >
                Our Story
              </button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tours" className="hover:text-blue-300 flex items-center gap-2">
                  <MapPin size={16} /> Tours
                </Link>
              </li>
              <li>
                <Link href="/visa" className="hover:text-blue-300 flex items-center gap-2">
                  <Image src='/icons/passport.png' alt="passport link icon" width={20} height={20} /> Visas
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:text-blue-300 flex items-center gap-2">
                  ✈️ Flights
                </Link>
              </li>
              <li>
                <Link href="/itinerary" className="hover:text-blue-300 flex items-center gap-2">
                  <Calendar size={16} /> Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="hover:text-blue-300 underline-offset-4 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-300 underline-offset-4 hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Theme Switcher */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone size={16} /> +1-234-567-890
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} /> info@digitalvoyage.com
                </li>
              </ul>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-6 border-t border-white/20 text-sm">
          © {new Date().getFullYear()} Digital Voyage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}