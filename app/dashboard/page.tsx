"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getGuestFavorites, removeGuestFavorite } from "@/lib/guestFavorites";
import { cn } from "@/lib/utils"; // Utility for className concatenation
import Image from "next/image";

// Types
type FavoriteItem = {
  id: string;
  type: string;
  itemId: string;
  title?: string;
  destination?: string;
  image?: string;
  extra?: string; // e.g. reviews, route, validity
};

type BookingItem = {
  id: string;
  tourId: string;
  startDate: string;
  endDate: string;
  guests: number;
  note?: string;
  destination?: string;
  type?: string;
  status?: string; // e.g. confirmed/pending/cancelled
  image?: string;
  title?: string;
};

const TABS = ["Favorites", "Bookings"] as const;
type TabType = typeof TABS[number];

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Determine tab from query param (e.g. after redirect)
  const tabFromQuery = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<TabType>(
    tabFromQuery === "Bookings" ? "Bookings" : "Favorites"
  );

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loadingFav, setLoadingFav] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Notification for redirect after booking
  useEffect(() => {
    if (searchParams.get("bookingSuccess")) {
      toast.success("Booking successful! You can view it here.");
      router.replace("/dashboard?tab=Bookings");
      setActiveTab("Bookings");
    }
  // eslint-disable-next-line
  }, []);

  // Fetch favorites
  useEffect(() => {
    setLoadingFav(true);
    if (session?.user) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then(async ({ favorites }) => {
          // Optionally expand extra details with batch fetches
          setFavorites(
            favorites.map((f: FavoriteItem) => ({
              id: f.id,
              type: f.type,
              itemId: f.itemId,
              title: f.title,
              destination: f.destination,
              image: f.image,
              extra: f.extra,
            }))
          );
          setLoadingFav(false);
        });
    } else {
      // Guest: localStorage
      const favs = getGuestFavorites();
      setFavorites(favs.map((f) => ({
        ...f,
        id: `${f.type}-${f.itemId}`,
      })));
      setLoadingFav(false);
    }
  }, [session?.user]);

  // Fetch bookings
  useEffect(() => {
    setLoadingBookings(true);
    if (session?.user) {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then(({ bookings }) => {
          setBookings(bookings);
          setLoadingBookings(false);
        });
    } else {
      const guestBookingsJSON = typeof window !== "undefined" ? localStorage.getItem("guest_bookings") : null;
      const guestBookings = guestBookingsJSON ? JSON.parse(guestBookingsJSON) : [];
      setBookings(guestBookings);
      setLoadingBookings(false);
    }
  }, [session?.user]);

  // Remove favorite
  async function handleRemoveFavorite(type: string, itemId: string) {
    if (session?.user) {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, itemId }),
      });
      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => !(f.type === type && f.itemId === itemId)));
        toast.success("Removed from favorites.");
      } else {
        toast.error("Failed to remove favorite.");
      }
    } else {
      removeGuestFavorite(type, itemId);
      setFavorites((prev) => prev.filter((f) => !(f.type === type && f.itemId === itemId)));
      toast.success("Removed from favorites.");
    }
  }

  // Remove booking
  async function handleRemoveBooking(id: string) {
    if (session?.user) {
      const res = await fetch(`/api/bookings`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        toast.success("Booking cancelled.");
      } else {
        toast.error("Failed to cancel booking.");
      }
    } else {
      const guestBookingsJSON = localStorage.getItem("guest_bookings");
      let guestBookings = guestBookingsJSON ? JSON.parse(guestBookingsJSON) : [];
      guestBookings = guestBookings.filter((b: BookingItem) => b.id !== id);
      localStorage.setItem("guest_bookings", JSON.stringify(guestBookings));
      setBookings(guestBookings);
      toast.success("Booking cancelled.");
    }
  }

  // Utility for type badge
  const TypeBadge = ({ type }: { type: string }) => {
    let color = "bg-blue-100 text-blue-700";
    if (type === "flights") color = "bg-green-100 text-green-700";
    if (type === "visas") color = "bg-yellow-100 text-yellow-700";
    if (type === "tours") color = "bg-indigo-100 text-indigo-700";
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // Utility for booking status badge
  const StatusBadge = ({ status }: { status?: string }) => {
    let color = "bg-gray-200 text-gray-700";
    const label = status || "pending";
    if (status === "confirmed") color = "bg-green-100 text-green-700";
    if (status === "cancelled") color = "bg-red-100 text-red-700";
    if (status === "pending") color = "bg-yellow-100 text-yellow-700";
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    );
  };

  // Skeleton loader
  const CardSkeleton = () => (
    <div className="border rounded p-4 flex flex-col bg-white shadow animate-pulse">
      <div className="h-28 bg-gray-200 rounded mb-3" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
      <div className="flex space-x-2 mt-auto">
        <div className="h-8 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );

  // Confirmation dialog
  function confirmAction(message: string, action: () => void) {
    if (window.confirm(message)) action();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-3">
      <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>
      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={cn(
              "px-4 py-2 rounded font-medium transition-colors",
              activeTab === tab
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Favorites Section */}
      {activeTab === "Favorites" && (
        <div>
          {loadingFav ? (
            <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
          ) : favorites.length === 0 ? (
            <div className="text-gray-500 text-center flex flex-col items-center">
              <Image src="/images/empty-favorites.svg" alt="No favorites" className="h-36 mb-4" />
              <p>No favorites yet.</p>
              {!session?.user && (
                <div className="mt-4">
                  <p>Want to save your favorites long-term?</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => signIn()}
                  >
                    Log in or Register
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((fav) => (
                <div key={fav.id} className="border rounded p-4 flex flex-col bg-white shadow group transition-all hover:shadow-lg">
                  <div className="relative h-28 mb-3 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    {fav.image ? (
                      <Image src={fav.image} alt={fav.title || fav.type} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-5xl text-gray-200">{fav.type === "tours" ? "🌍" : fav.type === "flights" ? "✈️" : "🛂"}</span>
                    )}
                    <div className="absolute top-1 right-1">
                      <TypeBadge type={fav.type} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1 truncate">{fav.title || `ID: ${fav.itemId}`}</div>
                    <div className="text-sm text-gray-500 truncate">{fav.destination}</div>
                    {fav.extra && (
                      <div className="text-xs mt-1 text-gray-400">{fav.extra}</div>
                    )}
                  </div>
                  <div className="flex items-center mt-3 space-x-2">
                    <Link href={`/${fav.type}/${fav.itemId}`}>
                      <button className="btn btn-sm btn-outline">View</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => confirmAction("Remove this from favorites?", () => handleRemoveFavorite(fav.type, fav.itemId))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookings Section */}
      {activeTab === "Bookings" && (
        <div>
          {loadingBookings ? (
            <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
          ) : bookings.length === 0 ? (
            <div className="text-gray-500 text-center flex flex-col items-center">
              <Image src="/images/empty-bookings.svg" alt="No bookings" className="h-36 mb-4" />
              <p>No bookings yet.</p>
              {!session?.user && (
                <div className="mt-4">
                  <p>Want to save your bookings long-term?</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => signIn()}
                  >
                    Log in or Register
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {bookings.map((b) => (
                <div key={b.id} className="border rounded p-4 flex flex-col bg-white shadow group transition-all hover:shadow-lg">
                  <div className="relative h-28 mb-3 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    {b.image ? (
                      <Image src={b.image} alt={b.title || b.tourId} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-5xl text-gray-200">{b.type === "tours" ? "🌍" : b.type === "flights" ? "✈️" : b.type === "visas" ? "🛂" : "📄"}</span>
                    )}
                    <div className="absolute top-1 right-1">
                      {b.type && <TypeBadge type={b.type} />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1 truncate">{b.title || `Ref: ${b.tourId}`}</div>
                    <div className="text-sm text-gray-500 truncate">{b.destination}</div>
                    <div className="text-xs text-gray-400 mb-1">
                      {b.startDate} &rarr; {b.endDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{b.guests} guests</span>
                      {b.status && <StatusBadge status={b.status} />}
                    </div>
                    {b.note && <div className="text-xs text-gray-400 mt-1">Note: {b.note}</div>}
                  </div>
                  <div className="flex items-center mt-3 space-x-2">
                    {/* If you have a details page: */}
                    {/* <Link href={`/booking/${b.id}`}>
                      <button className="btn btn-sm btn-outline">Details</button>
                    </Link> */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => confirmAction("Cancel this booking?", () => handleRemoveBooking(b.id))}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;