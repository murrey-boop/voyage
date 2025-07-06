'use client';
import Link from 'next/link';
import { Currency } from '@/constants';
import { currencies } from '@/constants/currencies';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import AuthModal from '@/components/auth/AuthModal';
import ProfileDropdown from '../ProfileDropdown';

export default function ToursNavbar({
  isLoggedIn,
  firstName,
  currency,
  onCurrencyChange,
  onLogout, // Pass this from parent or handle logout here
}: {
  isLoggedIn: boolean;
  firstName: string;
  currency: Currency;
  onCurrencyChange: (newCurrency: Currency) => void;
  onLogout?: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  // mobile nav items array for easy extension
  const mobileMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'All Tours', href: '/tours' },
    { label: 'Plan Holiday', href: '/tours/plan-holiday' },
    { label: 'My Bookings', href: '/account/bookings', requiresLogin: true },
  ];

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-30">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold font-montserrat text-teal-600"
          aria-label="Home"
        >
          Digital Voyaging
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <select
            value={currency.code}
            onChange={(e) => {
              const selectedCurrency =
                currencies.find((c) => c.code === e.target.value) || currencies[0];
              onCurrencyChange(selectedCurrency);
            }}
            className="border rounded-lg p-2 font-lato text-sm"
            aria-label="Select currency"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
          <Link
            href="/tours/plan-holiday"
            className="bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-400 hover:from-teal-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Start Your Trip
          </Link>
          {isLoggedIn ? (
            <Link
              href="/account"
              className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-full flex items-center justify-center font-montserrat"
              aria-label="My Account"
            >
              {firstName.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-teal-600 hover:text-blue-600 font-lato"
                aria-label="Login"
              >
                {isLoggedIn ?(
                  <ProfileDropdown />
                ) : (
                  'Login' 
                )}
                
              </button>
              {showAuthModal && (
                <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
              )}
            </>
          )}
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex items-center text-cyan-600"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-br from-cyan-500 via-blue-400 to-teal-400 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem' }}
        aria-hidden={!menuOpen}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col h-full pt-20 px-6">
          {mobileMenuItems.map(
            (item) =>
              (!item.requiresLogin || isLoggedIn) && (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mb-2 text-white text-lg font-bold hover:text-yellow-200 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
          )}
          <select
            value={currency.code}
            onChange={(e) => {
              const selectedCurrency =
                currencies.find((c) => c.code === e.target.value) || currencies[0];
              onCurrencyChange(selectedCurrency);
            }}
            className="border rounded-lg p-2 font-lato text-sm my-2"
            aria-label="Select currency"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
          {/* Show Login or Account button */}
          {isLoggedIn ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-2 mt-3 text-white font-semibold hover:text-yellow-300"
                onClick={() => setMenuOpen(false)}
              >
                <span className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center font-montserrat">
                  {firstName.charAt(0).toUpperCase()}
                </span>
                My Account
              </Link>
              {/* Logout Button at Bottom */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onLogout) onLogout(); // Call the logout handler
                }}
                className="not-only:mt-auto mb-18 flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white font-semibold py-2 px-4 rounded-lg transition"
                aria-label="Logout"
              >
                <Image
                  src="/icons/logoutIcon.svg"
                  alt="Logout"
                  className="w-5 h-5 border-red-500 border rounded-full p-1 bg-white/10 hover:bg-white/20 transition-transform duration-300"
                  priority
                  fill={true}
                />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mt-4 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => {
                  setMenuOpen(false);
                  setShowAuthModal(true);
                }}
                aria-label="Login"
              >
                Login
              </button>
              {showAuthModal && (
                <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
              )}
            </>
          )}
        </div>
      </div>
      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/5  z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
} 