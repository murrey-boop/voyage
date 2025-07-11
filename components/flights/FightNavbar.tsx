//TODO : Add an outside click handler to close the dropdowns when clicking outside
//TODO : Add a click handler to close the dropdowns when clicking on an item
//On Navbar,whatsApp icon to be displayed only.

'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Plane, ChevronDown, Globe, DollarSign } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import {SOCIAL_LINKS} from '@/constants/socials';

export default function FlightNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState('KE');
  const [selectedCurrency, setSelectedCurrency] = useState('KES');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);


    // Close dropdowns when clicking outside
  // East African countries and currencies
  const countries = [
    { name: 'Kenya', code: 'KE', flag: '/images/flags/kenya.jpg' },
    { name: 'Tanzania', code: 'TZ', flag: '/images/flags/tanzania.jpg' },
    { name: 'Uganda', code: 'UG', flag: '/images/flags/uganda.jpg' },
    { name: 'Rwanda', code: 'RW', flag: '/images/flags/rwanda.jpg' },
    { name: 'Burundi', code: 'BI', flag: '/images/flags/burundi.jpg' },
    { name: 'South Sudan', code: 'SS', flag: '/images/flags/south-sudan.jpg' },
    { name: 'Ethiopia', code: 'ET', flag: '/images/flags/ethiopia.jpg' },
  ];
  
  const currencies = [
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
    { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw' },
    { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' },
    { code: 'SSP', name: 'South Sudanese Pound', symbol: '£' },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
  ];
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Navbar entrance and menu animation
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  
    gsap.from(menuItemsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      delay: 0.3,
      duration: 0.5,
      ease: "back.out"
    });
  }, []);

  const handleHover = () => {
    gsap.to(planeRef.current, {
      rotate: 10,
      yoyo: true,
      repeat: 3,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const animateDropdown = (element: HTMLElement | null, isOpen: boolean) => {
    if (!element) return;
    
    gsap.to(element, {
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 10,
      duration: 0.3,
      ease: "power2.out",
      display: isOpen ? "block" : "none"
    });
  };

  const navLinks = [
    { name: 'Flights', href: '/flights' },
    { name: 'Deals', href: '/deals' },
    { name: 'Student Travel', href: '/student-travel' },
    { name: 'Support', href: '/support' }
  ];

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 w-full z-50 bg-white shadow-md py-3 border-b border-gray-100"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Plane
            ref={planeRef}
            size={30}
            className="text-teal-500 hover:text-teal-600 transition-colors"
            onMouseEnter={handleHover}
          />
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-800 hover:text-teal-600 transition-colors"
          >
            Digital Voyage
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              ref={el => { menuItemsRef.current[index] = el; }}
            >
              <Link 
                href={link.href}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Currency/Country Selectors and Social Icons */}
        <div className="flex items-center space-x-4">
          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                setIsCountryDropdownOpen(false);
              }}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors"
            >
              <DollarSign size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{selectedCurrency}</span>
              <ChevronDown size={16} className={`text-gray-600 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <div 
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 ${isCurrencyDropdownOpen ? 'block' : 'hidden'}`}
              ref={el => animateDropdown(el, isCurrencyDropdownOpen)}
            >
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    setSelectedCurrency(currency.code);
                    setIsCurrencyDropdownOpen(false);
                  }}
                  className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedCurrency === currency.code ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="font-medium w-12">{currency.code}</span>
                  <span className="text-gray-500">{currency.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Country Selector */}
          <div className="relative" ref={currencyDropdownRef}>
            <button 
              onClick={() => {
                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                setIsCurrencyDropdownOpen(false);
              }}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors"
            >
              <Globe size={16} className="text-gray-600" />
              <Image
                src={countries.find(c => c.code === selectedCountry)?.flag || '/images/flags/kenya.jpg'}
                alt="Country flag"
                width={20}
                height={20}
                className="rounded-full"
              />
              <ChevronDown size={16} className={`text-gray-600 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <div 
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 ${isCountryDropdownOpen ? 'block' : 'hidden'}`}
              ref={el => animateDropdown(el, isCountryDropdownOpen)}
            >
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country.code);
                    setIsCountryDropdownOpen(false);
                  }}
                  className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedCountry === country.code ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Image
                    src={country.flag}
                    alt={`${country.name} flag`}
                    width={20}
                    height={20}
                    className="rounded-full mr-2"
                  />
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={SOCIAL_LINKS.whatsapp.label}
          >
            <Image
              src={SOCIAL_LINKS.whatsapp.icon}
              alt="WhatsApp"
              width={SOCIAL_LINKS.whatsapp.width}
              height={SOCIAL_LINKS.whatsapp.height}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}