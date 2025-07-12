'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const socials = [
  { name: 'WhatsApp', icon: '/icons/whatsapp.svg', url: 'https://wa.me/254743524370', bg: 'bg-green-500' },
  { name: 'Facebook', icon: '/icons/facebook.svg', url: 'https://web.facebook.com/profile.php?id=100089526312677', bg: 'bg-blue-600' },
  { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://www.instagram.com/digital_voyaging/#', bg: 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500' },
  { name: 'X', icon: '/icons/twitter.svg', url: 'https://twitter.com/digitalvoyaging', bg: 'bg-neutral-900' }
];

export default function SocialIcons() {
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(iconsRef.current?.children || [], {
      opacity: 0,
      x: 40,
      stagger: 0.1,
      duration: 0.4,
      ease: "back.out",
      delay: 0.5
    });
  }, []);

  return (
    <div
      ref={iconsRef}
      className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col gap-3 z-50"
      style={{}}
    >
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200 ${social.bg}`}
          aria-label={social.name}
          title={social.name}
        >
          <Image
            src={social.icon}
            alt={social.name}
            width={22}
            height={22}
            className="w-6 h-6"
          />
        </a>
      ))}
    </div>
  );
}