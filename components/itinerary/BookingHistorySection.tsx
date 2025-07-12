'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { bookings, Booking } from '@/constants/itinerary';
import { MapPin } from 'lucide-react';

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

  // The iframe-based PDF export avoids global style leakage and oklch error
  const handleDownloadPDF = async (booking: Booking) => {
    //A4 size in points
    const a4Width = 595.28;
    const a4Height = 841.89;
    //  a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = `${a4Width}px`;
    iframe.style.height = `${a4Height}px`;
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    // 2. Write minimal HTML and styles to the iframe
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
           html, body { background: #fff; width: ${a4Width}px; height: ${a4Height}px; color: #222; font-family: Arial, sans-serif; margin: 0; }
            .receipt {
              background: #fff; color: #222; padding: 32px; font-family: Arial, sans-serif;
              width :${a4Width - 40}px;
              height: ${a4Height - 40}px;
              max-width: 400px; margin: 40px auto; border-radius: 12px; box-sizing: border-box;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #eee;
            }
            .receipt h1 { font-size: 1.8rem; margin-bottom: 1rem; text-align: center; }
            .receipt p { margin: 0.5rem 0; text-align: center; }
            .receipt strong { font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h1>Booking Receipt</h1>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Dates:</strong> ${booking.dates.start} to ${booking.dates.end}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
            <p><strong>Total Cost:</strong> KSh ${booking.totalCost}</p>
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Wait for the iframe content to layout
    await new Promise((res) => setTimeout(res, 50));

    const receiptDiv = doc.querySelector('.receipt') as HTMLElement;
    if (!receiptDiv) {
      document.body.removeChild(iframe);
      return;
    }

    // Load html2canvas into the iframe if needed, otherwise use the parent context
    type IframeWindowWithHtml2Canvas = Window & { html2canvas?: typeof html2canvas };
    let iframeHtml2canvas: typeof html2canvas | undefined;
    // Inject html2canvas script into iframe if not present
    const iframeWindow = iframe.contentWindow as IframeWindowWithHtml2Canvas;
    if (!iframeWindow.html2canvas) {
      const script = doc.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.onload = () => {
        iframeHtml2canvas = iframeWindow.html2canvas;
      };
      doc.body.appendChild(script);
      // Wait for script to load
      await new Promise((res) => {
        script.onload = res;
      });
    }
    iframeHtml2canvas = iframeWindow.html2canvas;
    if (!iframeHtml2canvas) {
      // fallback to parent's html2canvas, which works if iframe is same-origin
      iframeHtml2canvas = html2canvas;
    }

    // 4. Use html2canvas in the iframe context
    const canvas = await iframeHtml2canvas(receiptDiv, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // 5. Generate  PDF
const pdf = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4',
});
const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

const imgProps = {
  width: canvas.width,
  height: canvas.height,
};

let pdfWidth = pageWidth - 40;
let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
if (pdfHeight > pageHeight - 40) {
  pdfHeight = pageHeight - 40;
  pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
}
const x = (pageWidth - pdfWidth) / 2;
const y = (pageHeight - pdfHeight) / 2;

pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
pdf.save(`Booking_${booking.id}.pdf`);

    // 6. Clean up
    document.body.removeChild(iframe);
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