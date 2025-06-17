'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { MapPin, Plane, Calendar as CalendarIcon, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: <MapPin className="h-8 w-8 text-blue-600 mx-auto" aria-hidden="true" />,
    title: 'Tours',
    desc: 'Explore African safaris and cultural tours.',
    link: '/tours',
  },
  {
    icon: (
      <span className="relative flex items-center justify-center mx-auto h-8 w-8">
        <Image
          src="/images/icons/passport.png"
          alt="" // Decorative
          width={28}
          height={28}
          className="absolute left-0 top-0 h-7 w-7"
          aria-hidden="true"
        />
        <CreditCard className="h-6 w-6 text-blue-700 absolute right-0 bottom-0" aria-hidden="true" />
      </span>
    ),
    title: 'Visas',
    desc: 'Apply for visas with ease and confidence.',
    link: '/visa',
  },
  {
    icon: <Plane className="h-8 w-8 text-blue-600 mx-auto" aria-hidden="true" />,
    title: 'Flights',
    desc: 'Book affordable flights to your destination.',
    link: '/flights',
  },
  {
    icon: <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto" aria-hidden="true" />,
    title: 'Itineraries',
    desc: 'Plan your perfect travel itinerary.',
    link: '/itinerary',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.55, type: 'spring', stiffness: 70 },
  }),
}

export default function ServicesOverview() {
  // Two opposite corners: top-left and bottom-right (can make this alternate per card if desired)
  return (
    <section
      className="container mx-auto px-4 py-16"
      role="region"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-200"
      >
        Our Travel Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
          >
            <Link
              href={service.link}
              className="group block focus:outline-none"
              tabIndex={0}
              aria-label={`Learn more about ${service.title}`}
            >
              <div className="relative p-[2px] rounded-2xl overflow-visible isolate">
                {/* Gradient border effect */}
                <span
                  className={`
                    pointer-events-none absolute z-10
                    top-0 left-0 w-full h-full
                    rounded-2xl
                    transition-opacity duration-300
                    before:absolute before:content-['']
                    before:top-0 before:left-0
                    before:w-1/4 before:h-[7px]
                    before:bg-gradient-to-r before:from-blue-600 before:to-yellow-400
                    before:rounded-tl-2xl
                    before:opacity-0 group-hover:before:opacity-100
                    before:transition-opacity before:duration-300
                    after:absolute after:content-['']
                    after:bottom-0 after:right-0
                    after:w-1/4 after:h-[7px]
                    after:bg-gradient-to-l after:from-blue-600 after:to-yellow-400
                    after:rounded-br-2xl
                    after:opacity-0 group-hover:after:opacity-100
                    after:transition-opacity after:duration-300
                    `} // Top-left and bottom-right "L" borders
                  aria-hidden="true"
                />
                <span
                  className={`
                    pointer-events-none absolute z-10
                    top-0 left-0 h-1/4 w-[7px]
                    bg-gradient-to-b from-blue-600 to-yellow-400
                    rounded-tl-2xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}
                  aria-hidden="true"
                />
                <span
                  className={`
                    pointer-events-none absolute z-10
                    bottom-0 right-0 h-1/4 w-[7px]
                    bg-gradient-to-t from-blue-600 to-yellow-400
                    rounded-br-2xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}
                  aria-hidden="true"
                />
                {/* Inner card */}
                <div
                  className={`
                    relative z-20 bg-white dark:bg-gray-900 rounded-2xl
                    p-6 min-h-[220px]
                    shadow transition-all duration-300
                    group-hover:shadow-xl group-focus:shadow-xl
                    text-blue-900 dark:text-blue-200
                  `}
                  style={{
                    outline: "none",
                  }}
                >
                  {service.icon}
                  <h3 className="text-xl font-bold mt-4 text-center">{service.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-center">
                    {service.desc}
                  </p>
                  <span
                    className="text-blue-700 hover:underline mt-4 inline-block text-center font-semibold"
                    tabIndex={-1}
                  >
                    Learn More
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}