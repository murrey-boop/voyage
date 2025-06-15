'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

interface Destination {
  name: string;
  image: string;
  overlayImage: string;
}

export default function DestinationCards({ destinations }: { destinations: Destination[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (emblaApi) {
      const autoPlay = setInterval(() => {
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        else emblaApi.scrollTo(0);
      }, 5000); // adjust btn 3 to 5 seconds
      return () => clearInterval(autoPlay);
    }
  }, [emblaApi]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-montserrat">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {destinations.slice(0, 4).map((dest, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={dest.image} alt={dest.name} width={300} height={200} className="w-full h-48 object-cover" />
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <Image src={dest.overlayImage} alt="People enjoying" width={300} height={200} className="w-full h-full object-cover opacity-70" />
                <span className="absolute text-white font-montserrat text-lg font-semibold">{dest.name}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {destinations.slice(4, 8).map((dest, index) => (
              <div key={index} className="relative min-w-0 flex-[0_0_25%] p-1">
                <motion.div
                  className="relative rounded-lg overflow-hidden shadow-md group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={dest.image} alt={dest.name} width={300} height={200} className="w-full h-48 object-cover" />
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <Image src={dest.overlayImage} alt="People enjoying" width={300} height={200} className="w-full h-full object-cover opacity-70" />
                    <span className="absolute text-white font-montserrat text-lg font-semibold">{dest.name}</span>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}