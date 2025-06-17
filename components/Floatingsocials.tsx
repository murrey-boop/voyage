'use client';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/constants/socials';
import { Mail } from 'lucide-react';

export default function FloatingSocials() {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center">
      <a
        href={SOCIAL_LINKS.facebook.url}
        target="_blank"
        rel="noopener"
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-all hover:scale-110 shadow-lg"
        aria-label={SOCIAL_LINKS.facebook.label}
      >
        <Image 
          src={SOCIAL_LINKS.facebook.icon} 
          alt="Facebook"
          width={20}
          height={20}
        />
      </a>
      <a
        href={SOCIAL_LINKS.instagram.url}
        target="_blank"
        rel="noopener"
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-all hover:scale-110 shadow-lg"
        aria-label={SOCIAL_LINKS.instagram.label}
      >
        <Image 
          src={SOCIAL_LINKS.instagram.icon} 
          alt="Instagram"
          width={20}
          height={20}
        />
      </a>
      <a
        href={SOCIAL_LINKS.twitter.url}
        target="_blank"
        rel="noopener"
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-all hover:scale-110 shadow-lg"
        aria-label={SOCIAL_LINKS.twitter.label}
      >
        <Image 
          src={SOCIAL_LINKS.twitter.icon} 
          alt="Twitter"
          width={20}
          height={20}
          className='bg-yellow-50'
        />
      </a>
      <a
        href="mailto:info@digitalvoyage.com"
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-all hover:scale-110 shadow-lg"
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
    </div>
  );
}