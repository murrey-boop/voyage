'use client';

import { testimonials } from '@/data/testimonials';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Half star SVG
const HalfStar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="#facc15"/>
        <stop offset="50%" stopColor="#e5e7eb"/>
      </linearGradient>
    </defs>
    <path
      d="M10 15.27L16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 3.73L4.82 18z"
      fill="url(#half-grad)"
      stroke="#facc15"
      strokeWidth="1"
    />
  </svg>
);

// Star
const FullStar = () => (
  <svg width="20" height="20" fill="#facc15" viewBox="0 0 20 20">
    <path
      d="M10 15.27L16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 3.73L4.82 18z"
    />
  </svg>
);

// Empty star
const EmptyStar = () => (
  <svg width="20" height="20" fill="#e5e7eb" viewBox="0 0 20 20">
    <path
      d="M10 15.27L16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 3.73L4.82 18z"
    />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        rating >= star ? (
          <span key={star}><FullStar /></span>
        ) : rating >= star - 0.5 ? (
          <span key={star}><HalfStar /></span>
        ) : (
          <span key={star}><EmptyStar /></span>
        )
      )}
    </div>
  );
};

const MAX_VISIBLE = 12; // Limit to 12 for performance

const MIN_H_CLASS = 'min-h-[190px]'; 

export function Testimonial() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const truncateLen = 180;

  // Only show up to MAX_VISIBLE testimonials for performance
  const visibleTestimonials = testimonials.slice(0, MAX_VISIBLE);

  return (
    <section
      className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-500/5 to-blue-500/5 dark:from-gray-800 dark:to-gray-900 font-inter"
      role="region"
      aria-labelledby="testimonials-heading"
    >
      <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        aria-label="Customer testimonials carousel"
      >
        {visibleTestimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-blue-500/20 mx-2 h-full flex flex-col ${MIN_H_CLASS}`}>
              <div className="flex items-center mb-4 justify-between">
                <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name ? `Photo of ${testimonial.name}` : "Customer photo"}
                    fill
                    className="rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Role badge directly opposite image */}
                {testimonial.role && (
                  <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {testimonial.role}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-500">{testimonial.name}</span>
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mt-4 flex-1">
                &quot;{
                  expanded === index || testimonial.text.length <= truncateLen
                    ? testimonial.text
                    : <>
                        {testimonial.text.slice(0, truncateLen)}...
                        <button
                          className="ml-1 text-blue-600 underline hover:text-blue-800 focus:outline-none"
                          onClick={() => setExpanded(index)}
                          aria-label="Read more testimonial"
                        >Read more</button>
                      </>
                }&quot;
                {
                  expanded === index && testimonial.text.length > truncateLen &&
                  <button
                    className="ml-2 text-blue-600 underline hover:text-blue-800 focus:outline-none"
                    onClick={() => setExpanded(null)}
                    aria-label="Show less testimonial"
                  >Show less</button>
                }
              </p>
            </div>
          </SwiperSlide>
        ))}
        {/* Swiper navigation buttons – accessible and visible */}
        <button
          className="swiper-button-next !top-1/2 !-translate-y-1/2 !right-2 z-10 bg-blue-100 dark:bg-blue-800 rounded-full p-2 border border-blue-300 dark:border-blue-700 shadow transition hover:bg-blue-200 focus:outline-blue-600 focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
          aria-label="Next testimonial"
        />
        <button
          className="swiper-button-prev !top-1/2 !-translate-y-1/2 !left-2 z-10 bg-blue-100 dark:bg-blue-800 rounded-full p-2 border border-blue-300 dark:border-blue-700 shadow transition hover:bg-blue-200 focus:outline-blue-600 focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
          aria-label="Previous testimonial"
        />
      </Swiper>
    </section>
  );
}