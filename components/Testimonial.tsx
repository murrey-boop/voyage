'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  { name: 'Francis Maina', text: 'The Nairobi safari was breathtaking!', rating: 4.5, image: '/images/client1.jpg', type: 'tour' },
  { name: 'Ruth Muriithi', text: 'US visa process was seamless and fast.', rating: 5, image: '/images/client2.jpg', type: 'visa' },
  { name: 'Virginia Weru', text: 'Cheap flight to Paris, amazing service!', rating: 4, image: '/images/client3.jpg', type: 'flight' },
  { name: 'Michael Kibet', text: 'Mombasa tour was well-organized.', rating: 4.5, image: '/images/client4.jpg', type: 'tour' },
  { name: 'Sarah Atieno', text: 'UK visa application was so easy!', rating: 5, image: '/images/client5.jpg', type: 'visa' },
  { name: 'David Kimani', text: 'Flight to Dubai was a steal!', rating: 4.5, image: '/images/client6.jpg', type: 'flight' },
  { name: 'Jane Wanjiku', text: 'Cultural tour in Kenya was authentic.', rating: 4.8, image: '/images/client7.jpg', type: 'tour' },
  { name: 'Peter Mwangi', text: 'Canada visa support was top-notch.', rating: 4.7, image: '/images/client8.jpg', type: 'visa' },
  { name: 'Esther Njoroge', text: 'Loved the safari in Maasai Mara!', rating: 5, image: '/images/client9.jpg', type: 'tour' },
  { name: 'John Kamau', text: 'Flight to London was smooth and affordable.', rating: 4.6, image: '/images/client10.jpg', type: 'flight' },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            rating >= star
              ? 'text-yellow-400'
              : rating >= star - 0.5
              ? 'text-yellow-400 opacity-70'
              : 'text-gray-300'
          }`}
        >
          {rating >= star ? '★' : rating >= star - 0.5 ? '½' : '☆'}
        </span>
      ))}
    </div>
  );
};

 export function Testimonial() {
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
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        aria-label="Customer testimonials carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-blue-500/20 mx-2 h-full">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-blue-500">{testimonial.name}</span>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" aria-label="Next testimonial"></div>
        <div className="swiper-button-prev" aria-label="Previous testimonial"></div>
      </Swiper>
    </section>
  );
}

