'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [modalFocused, setModalFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Kenya');
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Accessibility: Keep refs for modal content for focusing
  const modalRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
  }, [hasMounted, theme]);

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
      gsap.fromTo(
        sidebarRef.current,
        { x: '-100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out', willChange: 'transform' }
      );
    }
  }, [isOpen]);

  // Close sidebar on outside click
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        overlayRef.current?.contains(event.target as Node)
      ) {
        handleMenuToggle();
      }
    },
    [isOpen, handleMenuToggle]
  );

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

  // Modal accessibility: open and focus modal
  const openModal = (href: string) => {
    setShowModal(href);
    setTimeout(() => {
      (modalRefs.current[href]?.querySelector('[role="menuitem"]') as HTMLElement | null)?.focus();
    }, 0);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  // Focus management for modal
  const handleModalFocus = () => setModalFocused(true);
  const handleModalBlur = () => {
    setModalFocused(false);
    setShowModal(null);
  };

  // Keyboard navigation for nav items
  const handleNavKeyDown = (e: React.KeyboardEvent, linkHref: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(linkHref);
    }
    if (e.key === 'ArrowDown' && showModal === linkHref) {
      e.preventDefault();
      (modalRefs.current[linkHref]?.querySelector('[role="menuitem"]') as HTMLElement | null)?.focus();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Keyboard navigation for modal items
  const handleModalKeyDown = (
    e: React.KeyboardEvent,
    href: string,
    itemsLength: number,
    idx: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % itemsLength;
      (modalRefs.current[href]?.querySelectorAll('[role="menuitem"]')[next] as HTMLElement)?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + itemsLength) % itemsLength;
      (modalRefs.current[href]?.querySelectorAll('[role="menuitem"]')[prev] as HTMLElement)?.focus();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  if (!hasMounted) return null;

  return (
    <>
      <nav
        aria-label="Main Navigation"
        ref={navRef}
        className={`fixed w-full z-50 transition-colors duration-300 font-inter ${
          theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-primary/70 text-white'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center space-x-2">
            <Image src="/images/voyage-logo.png" alt="Logo" width={40} height={40} className="rounded-full" priority />
            <Link href="/" className="text-xl font-bold text-white">
              Digital Voyage
            </Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className="text-white hover:text-red-500 bg-white/20 hover:bg-white/30 rounded-full"
              aria-expanded={isOpen}
              aria-controls="sidebar"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:space-x-6 items-center">
            <ul ref={linksRef} className="flex space-x-6 items-center" role="menubar">
              {navLinks.map((link) => (
                <li role="none" key={link.href} className="relative text-xl group">
                  <a
                    href={link.href}
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={showModal === link.href}
                    aria-controls={`modal-${link.href}`}
                    tabIndex={0}
                    className="text-white hover:text-blue-500 transition-colors duration-200 focus:outline-none"
                    onMouseEnter={() => openModal(link.href)}
                    onFocus={() => openModal(link.href)}
                    onKeyDown={(e) => handleNavKeyDown(e, link.href)}
                  >
                    {link.label}
                  </a>
                  {/* Modal Dropdown */}
                  {showModal === link.href && (
                    <div
                      ref={el => { modalRefs.current[link.href] = el; }}
                      id={`modal-${link.href}`}
                      role="menu"
                      aria-label={`${link.label} submenu`}
                      tabIndex={-1}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-white dark:bg-gray-800 rounded-md z-50 p-4 shadow-xl border border-gray-200 dark:border-orange-300"
                      onFocus={handleModalFocus}
                      onBlur={handleModalBlur}
                      onMouseLeave={closeModal}
                      >
                      <span className="sr-only">{link.label} submenu</span>
                      {modalContent[link.href as keyof typeof modalContent].map((card, idx) => (
                        <a
                          key={card.href}
                          href={card.href}
                          role="menuitem"
                          tabIndex={0}
                          className="block p-2 rounded-md transition-all duration-300 hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-orange-900 dark:focus:bg-orange-900 focus:outline-none"
                          onKeyDown={e =>
                            handleModalKeyDown(
                              e,
                              link.href,
                              modalContent[link.href as keyof typeof modalContent].length,
                              idx
                            )
                          }
                          onClick={closeModal}
                        >
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {card.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {card.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now / My Bookings Button */}
          <Button
            asChild
            variant="default"
            className="hidden md:block ml-4 bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-transform"
            aria-label={session ? 'My Bookings' : 'Book a Trip Now'}
          >
            {session ? (
              <Link href="/itinerary/history">My Bookings</Link>
            ) : (
              <Link href="/booking">Book Now</Link>
            )}
          </Button>

          {/* Country Switcher */}
          <div className="hidden md:block">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px] text-white bg-transparent border border-white">
                <SelectValue placeholder="Select Country" aria-label="Select a Country" />
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
        className="fixed top-0 left-0 w-3/4 sm:w-1/3 md:hidden h-full bg-gray-900 dark:bg-grey z-50 text-white p-6 flex flex-col justify-between shadow-lg font-inter"
      >
        <ul className="space-y-6 mt-8 px-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                id="sidebar"
                onClick={handleMenuToggle}
                className="text-lg hover:text-blue-400 transition"
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
          className="mt-6 w-full text-white border border-white bg-blue-500 hover:bg-blue-600 transition-transform"
          onClick={() => {
            handleMenuToggle();
            router.push(session ? '/itinerary/history' : '/booking');
          }}
        >
          {session ? (
            <Link href="/itinerary/history" onClick={handleMenuToggle}>
              My Bookings
            </Link>
          ) : (
            <Link href="/booking" onClick={handleMenuToggle}>
              Book Now
            </Link>
          )}
        </Button>

        <div className="flex items-center space-x-2 justify-center align-bottom mt-6">
          <Image src="/images/voyage-logo.png" alt="Logo" width={20} height={20} className="rounded-full" />
          <span className="font-semibold text-white">Voyaging</span>
        </div>
      </div>
    </>
  );
}