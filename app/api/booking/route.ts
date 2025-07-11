import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
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
        // Optionally create the DB user if not found (with minimal info)
        dbUser = await prisma.user.create({
          data: {
            clerkId: clerkUserId,
            email: undefined, // Clerk user email not available here
            name: "Clerk User",
            password: await bcrypt.hash(Date.now().toString(), 10), // random password, not usable
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
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}