'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const [category, setCategory] = useState('tours');
  const [query, setQuery] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
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
          alt="hero-section background image"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Content */}
      <div ref={contentRef} className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Tours, Visas, and Flights
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Plan your perfect African adventure with Digital Voyage
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Search travel services">
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
            className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            aria-label="Learn about our story"
          >
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}