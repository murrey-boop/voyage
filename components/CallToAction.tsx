'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react'; 

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-16 bg-accent/10 dark:bg-accent/20 relative overflow-hidden">
      {/* Optional decorative elements  */}
      <Plane className="absolute top-10 right-10 text-orange-300/20 w-24 h-24 rotate-45 hidden md:block" />
      
      <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Discover unforgettable tours and adventures with Digital Voyage.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:scale-105 hover:shadow-lg transition-all duration-300"
            asChild
          >
            <a href="/tours">Explore Tours →</a>
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
    </section>
  );
}