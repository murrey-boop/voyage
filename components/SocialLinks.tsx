'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const socials = [
  { name: 'WhatsApp', id:'whatsapp',icon: '/icons/whatsapp.svg', url: 'https://wa.me/254743524370'  },
  { name: 'Facebook', icon: '/icons/facebook.svg', url: 'https://facebook.com/digitalvoyage' },
  { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://instagram.com/digitalvoyage' },
  { name: 'X', icon: '/icons/twitter.svg', url: 'https://twitter.com/digitalvoyage' }
];

export default function SocialIcons() {
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(iconsRef.current?.children || [], {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out",
      delay: 0.5
    });
  }, []);

  return (
    <div ref={iconsRef} className="flex space-x-4">
      {socials.map((social) => (
        <a 
          key={social.name}
          href={social.url} 
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white rounded-full shadow hover:bg-teal-50 transition-colors"
          aria-label={social.name}
        >
          <Image
            src={social.icon} 
            alt={social.name} 
            className="w-5 h-5" 
          />
        </a>
      ))}
    </div>
  );
}