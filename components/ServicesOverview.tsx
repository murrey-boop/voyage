'use client'

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { MapPin, Plane, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

function ServicesOverview() {
  return (
    <div>
      <section
        className="container mx-auto px-4 py-16"
        role="region"
        aria-labelledby="services-heading"
      >
        <h2 id="services-heading" className="text-3xl font-bold text-center mb-12">
          Our Travel Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <MapPin className="h-8 w-8 text-blue-500" />,
              title: 'Tours',
              desc: 'Explore African safaris and cultural tours.',
              link: '/tours',
            },
            {
              icon: <Image 
                src="/images/icons/passport.png" 
                alt="passport" 
                width={32}
                height={32}
                className="h-8 w-8 text-blue-500" 
              />,
              title: 'Visas',
              desc: 'Apply for visas with ease and confidence.',
              link: '/visa',
            },
            {
              icon: <Plane className="h-8 w-8 text-blue-500" />,
              title: 'Flights',
              desc: 'Book affordable flights to your destination.',
              link: '/flights',
            },
            {
              icon: <CalendarIcon className="h-8 w-8 text-blue-500" />, // Fixed icon
              title: 'Itineraries',
              desc: 'Plan your perfect travel itinerary.',
              link: '/itinerary',
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mt-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{service.desc}</p>
              <Link href={service.link} className="text-blue-500 hover:underline mt-4 inline-block">
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesOverview;