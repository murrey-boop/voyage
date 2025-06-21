'use client';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function WhatsAppFloat() {
  const floatRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation
    const floatAnimation = gsap.to(floatRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });

    // Bubble pulse effect
    const bubbleAnimation = gsap.to(bubbleRef.current, {
      scale: 1.1,
      opacity: 0.8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });

    return () => {
      floatAnimation.kill();
      bubbleAnimation.kill();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        ref={bubbleRef}
        className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full opacity-0"
      />
      <div ref={floatRef}>
        <a
          href="https://wa.me/254743524370"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => {
            gsap.to(floatRef.current, { scale: 1.1, duration: 0.2 });
          }}
          onMouseLeave={() => {
            gsap.to(floatRef.current, { scale: 1, duration: 0.2 });
          }}
        >
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            className="w-8 h-8"
            width={32}
            height={32}
          />
        </a>
      </div>
    </div>
  );
}