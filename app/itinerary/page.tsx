'use client';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ToursNavbar from '@/components/tours/ToursNavbar';
import FooterTours from '@/components/Footer';
import BookingHistorySection from '@/components/itinerary/BookingHistorySection';
import TravelHistorySection from '@/components/itinerary/TravelHistorySection';
import ItineraryPlanSection from '@/components/itinerary/ItineraryPlanSection';
import { defaultCurrency } from '@/constants/currencies';
import 'react-tabs/style/react-tabs.css';

export default function ItineraryPage() {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [activeTab, setActiveTab] = useState(0);

  const handleCurrencyChange = (newCurrency: { code: string; symbol: string; rate: number }) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="font-montserrat min-h-screen flex flex-col">
      <ToursNavbar isLoggedIn={true} firstName="John" currency={currency} onCurrencyChange={handleCurrencyChange} />
      <div
        className="flex-grow flex items-center justify-center py-16 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/travel-bg.jpg)' }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <h1 className="text-2xl font-bold text-center mb-6 font-montserrat">Your Itinerary</h1>
          <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
            <TabList className="flex justify-center space-x-4 mb-6">
              <Tab className="px-4 py-2 cursor-pointer font-montserrat font-semibold text-teal-500 hover:text-teal-700 focus:outline-none">
                Booking History
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer font-montserrat font-semibold text-teal-500 hover:text-teal-700 focus:outline-none">
                Travel History
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer font-montserrat font-semibold text-teal-500 hover:text-teal-700 focus:outline-none">
                Itinerary Plan
              </Tab>
            </TabList>
            <TabPanel>
              <BookingHistorySection />
            </TabPanel>
            <TabPanel>
              <TravelHistorySection />
            </TabPanel>
            <TabPanel>
              <ItineraryPlanSection />
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <FooterTours />
    </div>
  );
}