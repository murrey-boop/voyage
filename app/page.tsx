import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ServicesOverview from '@/components/ServicesOverview';
import { Testimonial } from '@/components/Testimonial';
import TourCard  from '@/components/TourCard';
import React from 'react'

function HomePage() {
  return (
    <main>
    <Navbar/>
    <HeroSection />
    <ServicesOverview />
    <TourCard />
    <Testimonial />
    <Footer />
    </main>
  )
}

export default HomePage;