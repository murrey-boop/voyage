'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { FaRegHandshake, FaUserTie, FaRegCreditCard, FaGlobeAfrica } from 'react-icons/fa';

const SERVICES = [
  {
    icon: <FaRegHandshake className="text-teal-400 w-7 h-7" />,
    title: 'Flexible Booking',
    desc: 'Easy rescheduling and free cancellation on most tours.',
  },
  {
    icon: <FaUserTie className="text-blue-400 w-7 h-7" />,
    title: 'Expert Guides',
    desc: 'Handpicked guides with local knowledge.',
  },
  {
    icon: <FaRegCreditCard className="text-cyan-400 w-7 h-7" />,
    title: 'Secure Payments',
    desc: 'Multiple payment options, always protected.',
  },
  {
    icon: <FaGlobeAfrica className="text-yellow-400 w-7 h-7" />,
    title: 'Global Reach',
    desc: 'Top destinations in Africa and beyond.',
  },
];

export default function TourServices() {
// const imageRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   if (imageRef.current) {
//     gsap.to(imageRef.current, {
//       y: -20,
//       rotationX: 15,
//       rotationY: 15,
//       duration: 2.2,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     });
//     gsap.to(imageRef.current, {
//       boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5)',
//       duration: 2.2,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     });
//   }
// }, []);
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Text and Service Highlights */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-montserrat">
            Voyage Tour Services
          </h2>
          <p className="text-lg font-lato mb-8 text-gray-200">
            At Digital Voyaging, we offer tailored travel plans, expert guides, and unforgettable experiences. Whether you&apos;re seeking adventure, culture, or relaxation, our team ensures every detail is perfect for your dream holiday.
          </p>
          {/* Service Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 bg-white/5 rounded-lg p-3"
              >
                {service.icon}
                <div>
                  <div className="font-semibold text-base">{service.title}</div>
                  <div className="text-xs text-gray-300">{service.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/tours/plan-holiday"
            className="inline-flex bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 items-center space-x-2 shadow-lg hover:from-cyan-500 hover:to-blue-800"
          >
            <span>Plan Your Holiday</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
<div className="lg:w-1/2 flex justify-center">
  <div
    className="relative w-100 h-70 bg-teal-500/10 rounded-lg overflow-hidden shadow-xl"
    style={{ perspective: '1000px' }}
    aria-label="Maasai community video"
  >
    <video
      src="/videos/random-video.mp4" 
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="/images/random-video2.mp4" // optional placeholder image
      style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))' }}
    />
    {/* Optional overlay for contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
    {/* Optional tagline */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 shadow">
      Experience Authentic African Culture
    </div>
  </div>
</div>
      </div>
    </section>
  );
}