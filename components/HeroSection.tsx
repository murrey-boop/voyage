'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { gsap } from 'gsap';

const SUGGESTIONS = [
  { label: 'Nairobi Safari', category: 'tours', query: 'Kenya safari' },
  { label: 'Zanzibar Beach', category: 'tours', query: 'Zanzibar Beach' },
  { label: 'US Visa', category: 'visas', query: 'US visa' },
  { label: 'Cape Town Flight', category: 'flights', query: 'NBO to CPT' },
];

const PROMO_TEXT = 'SUMMER DEAL: 20% off select tours!';

export default function HeroSection() {
  const [category, setCategory] = useState('tours');
  const [query, setQuery] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const router = useRouter();

  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, willChange: 'transform' }
    );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let redirectUrl = '';
    const q = query.toLowerCase();

    if (category === 'tours') {
      redirectUrl = `/tours?section=${encodeURIComponent(q)}`;
    } else if (category === 'visas') {
      const countryMatch = q.match(/(\w+)\svisa/i);
      const country = countryMatch ? countryMatch[1].toUpperCase() : q;
      redirectUrl = `/visa?country=${encodeURIComponent(country)}`;
    } else if (category === 'flights') {
      const flightMatch = q.match(/^([A-Za-z]{3}|[A-Za-z\s]+)\sto\s/i);
      const origin = flightMatch ? flightMatch[1].toUpperCase() : 'NBO';
      redirectUrl = `/flights?origin=${encodeURIComponent(origin)}`;
    }

    router.push(redirectUrl);
  };

  const handleSuggestionClick = (suggestion: typeof SUGGESTIONS[number]) => {
    setCategory(suggestion.category);
    setQuery(suggestion.query);
  };

  // Handle keyboard and click for dismissing promo (X icon)
  const handlePromoDismiss = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      if (e.key === 'Enter' || e.key === ' ') {
        setPromoVisible(false);
      }
    } else {
      setPromoVisible(false);
    }
  };

  return (
    <section
      ref={containerRef}
      role="banner"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden font-inter"
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="" // Decorative
          fill
          className={`object-cover ${imageLoaded ? '' : 'hidden'}`}
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/hero-lowres.jpg"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => (e.currentTarget.src = '/images/fallback.jpg')}
          aria-hidden="true"
        />
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Left-side Promo Badge */}
      {promoVisible && (
        <div
          className="
            hidden
            md:flex
            flex-col
            items-center
            justify-center
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            z-30
            "
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 bg-orange-500/90 text-white text-base px-4 py-2 rounded-2xl font-semibold shadow-lg">
            {/* Simple Summer Icon (SVG or image) */}
            <span aria-hidden="true">
              <Image src="/images/summer.jpg" alt="" width={32} height={32} className="drop-shadow" />
            </span>
            <span>{PROMO_TEXT}</span>
            <button
              type="button"
              onClick={handlePromoDismiss}
              onKeyDown={handlePromoDismiss}
              className="ml-2 bg-transparent text-white hover:text-yellow-200 text-lg leading-5 focus:outline-none"
              aria-label="Dismiss promo"
              tabIndex={0}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* Mobile-friendly badge above hero content */}
      {promoVisible && (
        <div className="md:hidden flex justify-center absolute top-20 left-0 w-full z-30">
          <div className="flex items-center gap-2 bg-orange-500/90 text-white text-sm px-4 py-1.5 rounded-full font-semibold mb-4 shadow-lg">
            <span aria-hidden="true">
              <Image src="/images/summer.jpg" alt="" width={24} height={24} />
            </span>
            {PROMO_TEXT}
            <button
              type="button"
              onClick={handlePromoDismiss}
              onKeyDown={handlePromoDismiss}
              className="ml-2 bg-transparent text-white hover:text-yellow-200 text-lg leading-5 focus:outline-none"
              aria-label="Dismiss promo"
              tabIndex={0}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-30 text-center px-4 max-w-4xl mx-auto w-full"
      >
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Tours, Visas, and Flights
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Plan your perfect African adventure with Digital Voyage
        </p>

        {/* Suggestions */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-6"
          aria-label="Popular searches"
        >
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 rounded-full bg-white/80 hover:bg-blue-100 text-gray-900 text-sm font-medium border border-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={`Search for ${suggestion.label}`}
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          aria-label="Search travel services"
          role="search"
          aria-describedby="hero-search-desc"
        >
          <span id="hero-search-desc" className="sr-only">
            Search for tours, visas, or flights. Choose a category and enter your search.
          </span>
          <Select value={category} onValueChange={setCategory} name="category">
            <SelectTrigger className="w-full sm:w-[180px] bg-white text-gray-900">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tours">Tours</SelectItem>
              <SelectItem value="visas">Visas</SelectItem>
              <SelectItem value="flights">Flights</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kenya safari, US visa, or flights"
            className="w-full sm:w-[300px] bg-white text-gray-900"
            aria-label="Search query"
            autoComplete="off"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6">
            Search
          </Button>
        </form>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            asChild
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6"
            aria-label="Explore available tours"
          >
            <Link href="/tours">Explore Tours</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={`
              border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white
              dark:border-white dark:text-white dark:hover:bg-white/10
              text-lg px-8 py-6
            `}
            aria-label="Book a hotel with us"
          >
            <Link href="/hotels">Hotel Booking</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}