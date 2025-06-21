"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  type BookingForm = {
    tourId: string;
    guests: number;
    startDate: string;
    endDate: string;
    note: string;
    destination: string;
    guestEmail?: string;
    guestPhone?: string;
    name?: string;
  };

  const [form, setForm] = useState<BookingForm>({
    tourId: "",
    guests: 1,
    startDate: "",
    endDate: "",
    note: "",
    destination: "",
    guestEmail: "",
    guestPhone: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Prefill form from query params on first render
  useEffect(() => {
    const tourId = searchParams.get("tourId") || "";
    const destination = searchParams.get("destination") || "";
    const title = searchParams.get("title") || "";
    const flightId = searchParams.get("flightId") || "";
    const visaId = searchParams.get("visaId") || "";
    const route = searchParams.get("route") || "";
    const country = searchParams.get("country") || "";

    setForm((f) => ({
      ...f,
      tourId: tourId || flightId || visaId || "",
      destination: destination || country || route || title || "",
    }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If you want to force login for bookings, uncomment below:
    // if (status === "unauthenticated") router.replace("/login?callbackUrl=/booking");
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const body = { ...form };
    if (session?.user) {
      // Remove guest fields
      delete body.guestEmail;
      delete body.guestPhone;
      delete body.name;
    } else {
      if (!form.guestEmail) {
        setError("Guest email required");
        return;
      }
    }

    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({
        tourId: "",
        guests: 1,
        startDate: "",
        endDate: "",
        note: "",
        destination: "",
        guestEmail: "",
        guestPhone: "",
        name: "",
      });
    } else {
      const data = await res.json();
      setError(data.error || "Booking failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Book Your Tour</h1>
      <form className="space-y-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Tour/Flight/Visa ID</label>
          <input
            className="input input-bordered w-full"
            placeholder="Tour/Flight/Visa ID"
            value={form.tourId}
            onChange={e => setForm(f => ({ ...f, tourId: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Destination/Country/Route</label>
          <input
            className="input input-bordered w-full"
            placeholder="Destination/Country/Route"
            value={form.destination}
            onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={form.startDate}
            onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">End Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={form.endDate}
            onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Number of Guests</label>
          <input
            type="number"
            min="1"
            className="input input-bordered w-full"
            value={form.guests}
            onChange={e => setForm(f => ({ ...f, guests: Number(e.target.value) }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Note</label>
          <input
            className="input input-bordered w-full"
            placeholder="Special requests or notes"
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          />
        </div>

        {/* Guest fields only show if not logged in */}
        {!session?.user && (
          <>
            <div>
              <label className="block mb-1 font-semibold">Your Name</label>
              <input
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Your Email</label>
              <input
                className="input input-bordered w-full"
                placeholder="Email"
                type="email"
                value={form.guestEmail}
                onChange={e => setForm(f => ({ ...f, guestEmail: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Phone (optional)</label>
              <input
                className="input input-bordered w-full"
                placeholder="Phone Number"
                value={form.guestPhone}
                onChange={e => setForm(f => ({ ...f, guestPhone: e.target.value }))}
              />
            </div>
          </>
        )}

        <button className="btn btn-primary w-full" type="submit">
          Book Now
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && (
        <p className="text-green-600 mt-3">
          Booking successful! We&apos;ll contact you soon.
        </p>
      )}
      {session?.user && (
        <div className="mt-4">
          <p>
            Booking as: <b>{session.user.name}</b> ({session.user.email})
          </p>
        </div>
      )}
    </div>
  );
}