'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import html2pdf from 'html2pdf.js';
import { bookings, Booking } from '@/constants/itinerary';
import { MapPin } from 'lucide-react';

// Type declaration for html2pdf.js
declare module 'html2pdf.js' {
  interface Html2Pdf {
    from: (element: HTMLElement) => {
      save: (filename: string) => void;
    };
  }
  function html2pdf(): Html2Pdf;
  export default html2pdf;
}

export default function BookingHistorySection() {
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const router = useRouter();

  const handleCancel = (id: string) => {
    if (!cancelReason) {
      alert('Please select a reason for cancellation.');
      return;
    }
    setBookingsList((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'canceled' as const } : booking
      )
    );
    setShowCancelModal(null);
    setCancelReason('');
  };

  const handleModify = (booking: Booking) => {
    router.push(`/tours/plan-holiday?bookingId=${booking.id}`);
  };

  const handleDownloadPDF = (booking: Booking) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h1>Booking Receipt</h1>
      <p>Booking ID: ${booking.id}</p>
      <p>Destination: ${booking.destination}</p>
      <p>Dates: ${booking.dates.start} to ${booking.dates.end}</p>
      <p>Status: ${booking.status}</p>
      <p>Total Cost: KSh ${booking.totalCost}</p>
    `;
    html2pdf().from(element).save(`Booking_${booking.id}.pdf`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 font-montserrat">Booking History</h2>
      {bookingsList.map((booking) => (
        <div key={booking.id} className="p-4 mb-4 border rounded-lg">
          <div className="flex items-center mb-2">
            <MapPin />
            <span className="font-lato">{booking.destination}</span>
          </div>
          <p className="font-lato">Booking ID: {booking.id}</p>
          <p className="font-lato">Dates: {booking.dates.start} to {booking.dates.end}</p>
          <p className="font-lato">Status: {booking.status}</p>
          <p className="font-lato">Total Cost: KSh {booking.totalCost}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setShowCancelModal(booking.id)}
              className="bg-red-500 text-white py-1 px-3 rounded-lg"
              disabled={booking.status === 'canceled'}
            >
              Cancel
            </button>
            <button
              onClick={() => handleModify(booking)}
              className="bg-blue-500 text-white py-1 px-3 rounded-lg"
              disabled={booking.status === 'canceled'}
            >
              Modify
            </button>
            <button
              onClick={() => handleDownloadPDF(booking)}
              className="bg-teal-500 text-white py-1 px-3 rounded-lg"
            >
              Download PDF
            </button>
          </div>
          {showCancelModal === booking.id && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 font-montserrat">Reason for Cancellation</h3>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-4"
                >
                  <option value="">Select a reason</option>
                  <option value="Change of Plans">Change of Plans</option>
                  <option value="Financial Issues">Financial Issues</option>
                  <option value="Other">Other</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowCancelModal(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}