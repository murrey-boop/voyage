'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToursNavbar from '@/components/tours/ToursNavbar';
import FooterTours from '@/components/tours/TourFooter';

export default function PlanHolidayPage() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [useDates, setUseDates] = useState(true);
  const [travelers, setTravelers] = useState(1);
  const [assistance, setAssistance] = useState<string[]>([]);
  const [currency, setCurrency] = useState({ code: 'KES', symbol: 'KSh', rate: 1 });
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const router = useRouter();

  const handleCurrencyChange = (newCurrency: { code: string; symbol: string; rate: number }) => {
    setCurrency(newCurrency);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const toggleAssistance = (option: string) => {
    setAssistance((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        router.push('/tours/book/confirmation');
      }, 1000);
    }, 2000); // Mock payment processing
  };

  return (
    <div className="font-montserrat min-h-screen flex flex-col">
      <ToursNavbar isLoggedIn={false} firstName="" currency={currency} onCurrencyChange={handleCurrencyChange} />
      <div
        className="flex-grow flex items-center justify-center py-16 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/travel-bg.jpg)' }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6 font-montserrat">
            Plan Your Holiday
          </h1>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Destination & Dates</h2>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Maasai Mara, Paris..."
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useDates}
                    onChange={() => setUseDates(!useDates)}
                    className="mr-2"
                  />
                  I know my travel dates
                </label>
              </div>
              <input
                type="date"
                value={dates.start ? dates.start.toISOString().split('T')[0] : ''}
                onChange={(e) => setDates({ ...dates, start: new Date(e.target.value) })}
                disabled={!useDates}
                className="w-full p-2 border rounded-lg mb-4 disabled:bg-gray-100"
              />
              <input
                type="date"
                value={dates.end ? dates.end.toISOString().split('T')[0] : ''}
                onChange={(e) => setDates({ ...dates, end: new Date(e.target.value) })}
                disabled={!useDates}
                className="w-full p-2 border rounded-lg mb-4 disabled:bg-gray-100"
              />
              <button onClick={nextStep} className="bg-teal-500 text-white py-2 px-4 rounded-lg w-full">
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Travelers & Assistance</h2>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                min="1"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="mb-4">
                {['Accommodation', 'Transportation', 'Guided Tours', 'Insurance', 'Photography'].map((option) => (
                  <label key={option} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={assistance.includes(option)}
                      onChange={() => toggleAssistance(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2">
                Back
              </button>
              <button onClick={nextStep} className="bg-teal-500 text-white py-2 px-4 rounded-lg">
                Next
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Payment</h2>
              <p className="mb-4">Total: {currency.symbol}5000 (Mock Price)</p>
              <p className="mb-4">Upfront Payment (50%): {currency.symbol}2500</p>
              <button
                onClick={handlePayment}
                className="bg-teal-500 text-white py-2 px-4 rounded-lg w-full"
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'idle' && 'Confirm 50% Payment'}
                {paymentStatus === 'processing' && 'Processing...'}
                {paymentStatus === 'success' && 'Payment Successful'}
              </button>
            </div>
          )}
        </div>
      </div>
      <FooterTours />
    </div>
  );
}