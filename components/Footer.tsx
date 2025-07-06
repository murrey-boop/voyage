'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useEffect, useRef, useState } from 'react';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function isValidEmail(email: string) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setSubmitted(true);
    setError('');
    setEmail(''); // Clears the field after subscribing
    // TODO: Integrate with newsletter service (API call)
  }

  return (
    <form
      className="flex flex-col sm:flex-row items-center gap-3 mt-6"
      onSubmit={handleSubmit}
      aria-label="Subscribe to newsletter"
    >
      <input
        ref={inputRef}
        type="email"
        className="rounded px-4 py-2 w-full sm:w-auto text-gray-900"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-label="Email address"
        required
        disabled={submitted}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
        disabled={submitted}
      >
        {submitted ? 'Subscribed!' : 'Subscribe'}
      </button>
      {error && <span className="text-red-300 ml-2 text-sm">{error}</span>}
    </form>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate as it comes in
  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.opacity = visible ? '1' : '0';
      btnRef.current.style.transform = visible
        ? 'translateY(0)'
        : 'translateY(40px)';
      btnRef.current.style.pointerEvents = visible ? 'auto' : 'none';
    }
  }, [visible]);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed z-40 right-5 bottom-7 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      tabIndex={visible ? 0 : -1}
      aria-label="Scroll to top"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full py-12 bg-gradient-to-br from-blue-500/80 to-gray-900 text-white font-inter relative"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Logo centered on small screens */}
      <div className="flex justify-center mb-6 md:hidden">
        <Image
          src="/images/voyage-logo.png"
          alt="Digital Voyage Logo"
          width={64}
          height={64}
          className="mx-auto"
          priority
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us + Newsletter */}
          <div>
            {/* Logo on md+ screens */}
            <div className="hidden md:flex mb-4">
              <Image
                src="/images/voyage-logo.png"
                alt="Digital Voyage Logo"
                width={48}
                height={48}
                className="mx-0"
                priority
              />
            </div>
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
            <NewsletterSignup />
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
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-6 border-t border-white/20 text-sm">
          © {new Date().getFullYear()} Digital Voyage. All rights reserved.
        </div>
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTopButton />
    </footer>
  );
}