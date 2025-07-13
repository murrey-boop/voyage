import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import bcrypt from "bcrypt";

// Helper to create or find a guest user
async function findOrCreateGuest(email: string, phoneNumber?: string, name = "Guest") {
  // Try to find existing user by email
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        name,
        password: await bcrypt.hash(Date.now().toString(), 10), // random password, not usable
      },
    });
  }
  return user;
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    const data = await req.json();
    // Expected data: { tourId, guests, startDate, endDate, note, guestEmail, guestPhone }
    const {
      tourId,
      guests,
      startDate,
      endDate,
      note,
      guestEmail,
      guestPhone,
      name: guestName,
    } = data;

    // Find or create user
    let userId: number;
    if (clerkUserId) {
      // If using Clerk, find user by Clerk ID
      let dbUser = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
      if (!dbUser) {
        // Get full user data from Clerk
        const clerkUser = await currentUser();
        if (!clerkUser) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create the DB user with proper email from Clerk
        dbUser = await prisma.user.create({
          data: {
            clerkId: clerkUserId,
            email: clerkUser.emailAddresses[0]?.emailAddress || `${clerkUserId}@clerk.temp`,
            name: clerkUser.firstName && clerkUser.lastName 
              ? `${clerkUser.firstName} ${clerkUser.lastName}`
              : clerkUser.username || "Clerk User",
            password: await bcrypt.hash(Date.now().toString(), 10), // random password, not usable
            phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || null
          },
        });
      }
      userId = dbUser.id;
    } else if (guestEmail) {
      const guest = await findOrCreateGuest(guestEmail, guestPhone, guestName || "Guest");
      userId = guest.id;
    } else {
      return NextResponse.json({ error: "Authentication or guest email required" }, { status: 401 });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        tourId,
        userId,
        guests,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        note,
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}