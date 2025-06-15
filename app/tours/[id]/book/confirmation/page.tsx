'use client';
import ToursNavbar from '@/components/tours/ToursNavbar';
import FooterTours from '@/components/tours/TourFooter';

export default function ConfirmationPage() {
  const travelDate = new Date('2025-06-12'); // Example travel date
  const remainderDueDate = new Date(travelDate);
  remainderDueDate.setDate(travelDate.getDate() - 7);

  return (
    <div className="font-montserrat">
      <ToursNavbar isLoggedIn={false} firstName="" currency={{ code: 'KES', symbol: 'KSh', rate: 1 }} onCurrencyChange={() => {}} />
      <div className="container mx-auto px-8 sm:px-16 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 font-montserrat">
          Booking Confirmed!
        </h1>
        <p className="text-lg font-lato text-center mb-4">
          Thank you for booking with Digital Voyaging. You’ve paid KSh 2500 upfront. The remaining KSh 2500 is due by {remainderDueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
        <p className="text-lg font-lato text-center">
          You’ll receive a confirmation email shortly with your trip details.
        </p>
      </div>
      <FooterTours />
    </div>
  );
}