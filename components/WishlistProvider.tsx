// components/WishlistProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type WishlistContextType = {
  wishlist: string[];
  toggleWishlist: (dealId: string) => void;
  isInWishlist: (dealId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('flightDealsWishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('flightDealsWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (dealId: string) => {
    setWishlist(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId) 
        : [...prev, dealId]
    );
  };

  const isInWishlist = (dealId: string) => wishlist.includes(dealId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}