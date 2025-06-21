import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import  getServerSession  from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    const session = await getServerSession(authOptions);
    const data = await req.json();
    // Expected data: { tourId, guests, startDate, endDate, note, destination, guestEmail, guestPhone }
    const {
      tourId,
      guests,
      startDate,
      endDate,
      note,
      destination,
      guestEmail,
      guestPhone,
      name: guestName,
    } = data;

    // Find or create user
    let userId: number;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
      userId = user.id;
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
        // date: new Date(), // You can add the current date if needed
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}