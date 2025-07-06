'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react'; 

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 dark:from-accent/10 dark:via-accent/20 dark:to-accent/10 relative overflow-hidden">
      {/* Animated plane */}
      <Plane 
        className="absolute top-10 right-10 text-orange-300/30 w-24 h-24 rotate-45 hidden md:block animate-float"
        aria-hidden="true"
      />
      {/* Decorative flight path (optional SVG) */}
      <svg
        className="absolute top-28 right-0 w-48 h-16 opacity-40 hidden md:block"
        viewBox="0 0 200 40"
        fill="none"
      >
        <path
          d="M0 30 Q100 -10 200 30"
          stroke="#fdba74"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>
      <div className="text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 bg-clip-text text-transparent">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Discover unforgettable tours and adventures with Digital Voyage.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-xl
                       hover:scale-105 hover:shadow-2xl transition-all duration-300
                       after:content-[''] after:absolute after:inset-0 after:rounded-xl
                       after:ring-2 after:ring-orange-300/30 after:opacity-0 hover:after:opacity-100
                       after:transition-all after:duration-300"
            asChild
          >
            <a href="/tours" className="flex items-center gap-2">
              Explore Tours
              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none duration-200">→</span>
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-gray-800 dark:text-white border-gray-800 dark:border-white hover:bg-orange-400/10 hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>
      {/* Optional: Custom CSS for floating animation */}
      <style jsx global>{`
        .animate-float {
          animation: floatPlane 3.5s ease-in-out infinite;
        }
        @keyframes floatPlane {
          0%, 100% { transform: rotate(45deg) translateY(0);}
          50% { transform: rotate(45deg) translateY(-18px);}
        }
      `}</style>
    </section>
  );
}