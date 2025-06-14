'use client';

import React, { useState, useEffect, useRef,useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { africanCountries } from '@/constants/countries';
import { navLinks, modalContent } from '@/components/index';
import { gsap } from 'gsap';
//import { SelectLabel } from '@radix-ui/react-select';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('Kenya');
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const {theme}=useTheme();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 0) {
          navRef.current.classList.add('bg-primary/70', 'shadow-lg', 'backdrop-blur');
        } else {
          navRef.current.classList.remove('bg-primary/70', 'shadow-lg', 'backdrop-blur');
          navRef.current.classList.add(theme === 'light' ? 'bg-gray-100' : 'bg-primary/70');

        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    gsap.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, willChange: 'transform' });
    gsap.fromTo(linksRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, willChange: 'transform' });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMounted,theme]);

  const handleMenuToggle = useCallback(() => {
    if (isOpen && sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          setIsOpen(false);
          document.body.classList.remove('overflow-hidden');
        },
      });
    } else {
      setIsOpen(true);
      document.body.classList.add('overflow-hidden');
      gsap.fromTo(sidebarRef.current, { x: '-100%' }, { x: '0%', duration: 0.5, ease: 'power3.out',
        willChange: 'transform'});
    }
  }, [isOpen]);

  // Close sidebar on outside click
const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      overlayRef.current?.contains(event.target as Node)
    ) {
      handleMenuToggle();
    }
  }, [isOpen, handleMenuToggle]);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768 && isOpen) {
      handleMenuToggle();
    }
  }, [isOpen, handleMenuToggle]);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('overflow-hidden');
    };
  }, [handleClickOutside, handleResize]);

  // Handle modal enter/leave with debounce
  const handleModalEnter = (href: string) => {
    setShowModal(href);
  };

  const handleModalLeave = () => {
    setShowModal(null);
  }

  if (!hasMounted) return null;

  return (
    <>
      <nav ref={navRef}
        className={`fixed w-full z-50 transition-colors duration-300 
        font-inter ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 
        'bg-primary/70 text-white'}`}

      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center space-x-2">
            <Image src="/images/voyage-logo.png" alt="Logo" 
            width={40} 
            height={40} 
            className="rounded-full" priority/>
            <Link href="/" className="text-xl font-bold text-white">Digital Voyage</Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className="text-white hover:text-red-500 bg-white/20 hover:bg-white/30 rounded-full"
              aria-expanded={isOpen}
              aria-controls='sidebar'
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:space-x-6 items-center">
            <ul ref={linksRef} className="flex space-x-6 items-center">
              {navLinks.map((link) => (
               <li
      key={link.href}
      className="relative text-xl group"
      role="menuitem"
      aria-haspopup="true"
     onMouseEnter={() => handleModalEnter(link.href)}
      onMouseLeave={handleModalLeave}
    >
      <Link
    href={link.href}
    className="text-white hover:text-blue-500 transition-colors duration-200"
     >
    {link.label}
     </Link>

     {/* Modal Dropdown */}
      {showModal === link.href && (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64
       bg-white dark:bg-gray-800 rounded-md z-50 p-4 shadow-xl border border-gray-200 dark:border-orange-300"
      role="menu"
    >
      {modalContent[link.href as keyof typeof modalContent].map((card, index) => (
        <Link
          key={index}
          href={card.href}
          className="block p-2 hover:bg-blue-100/60 dark:hover:bg-orange-900 rounded-md transition-all duration-300"
          onClick={() => setShowModal(null)}
          role="menuitem"
        >
          <h4 className="font-semibold text-gray-800 dark:text-white">{card.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{card.description}</p>
        </Link>
      ))}
    </div>
  )}
</li>
    
              ))}
            </ul>
          </div>
          {/* Book Now Button */}
          <Button asChild 
              variant="default" 
              className="hidden md:block ml-4 bg-blue-500 text-white hover:bg-blue-600 hover:scale-105
               transition-transform"
               aria-label='Book a Trip Now'
               >
            <Link href='/booking'>Book Now</Link>
          </Button>

          {/* Country Switcher */}
          <div className="hidden md:block">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px] text-white bg-transparent border border-white">
                <SelectValue placeholder="Select Country"
                 aria-label='Select a Country' />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border border-gray-700">
                {africanCountries.map((country) => (
                  <SelectItem key={country} value={country} className="hover:bg-gray-800">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

      </nav>
        {/* Overlay */}
        {isOpen && (
          <div
            ref={overlayRef}
            className="fixed top-0 left-0 w-full h-full bg-black/30 z-40"
            aria-hidden="true"
          />
        )}
       {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 w-3/4 sm:w-1/3 md:hidden h-full
           bg-gray-900 dark:bg-grey  z-50 text-white p-6 flex flex-col justify-between 
           shadow-lg font-inter"
        >
          <ul className="space-y-6 mt-8 px-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id='sidebar'
                  onClick={handleMenuToggle}
                  className='text-lg hover:text-blue-400 transition'
                  >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
              handleMenuToggle();
              router.push(`/country/${value.toLowerCase()}`);
            }}
          >
            
            <SelectTrigger className="w-full mt-6 text-white bg-transparent border border-white">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border border-gray-700">
              {africanCountries.map((country) => (
                <SelectItem key={country} value={country} className="hover:bg-gray-800">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
          asChild
            variant="default"
            className="mt-6 w-full text-white border border-white
             bg-blue-500 hover:bg-blue-600   transition-transform"
            onClick={() => {
              handleMenuToggle();
              router.push('/itinerary');
            }}
          >
            <Link href="/booking" onClick={handleMenuToggle}>Book Now</Link>
          </Button>

          <div className="flex items-center space-x-2 justify-center align-bottom mt-6">
            <Image src="/images/voyage-logo.png" alt="Logo" width={20} height={20} className="rounded-full" />
            <span className="font-semibold text-white">Voyaging</span>
          </div>
        </div>
    </>
  );
}
