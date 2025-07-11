import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Helper to get Clerk user ID from request
async function getClerkUserId() {
  const user = await auth();
  return user?.userId || null;
}

export async function POST(req: NextRequest) {
  const userId = await getClerkUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, itemId } = await req.json();
  if (!type || !itemId) {
    return NextResponse.json({ error: "type and itemId required" }, { status: 400 });
  }

  // Make sure the user exists in your database, or create them if needed
  let user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    // Optionally, you can create the user here if not found
    user = await prisma.user.create({ data: { clerkId: userId } });
  }

  // Create favorite if not exists
  const favorite = await prisma.favorite.upsert({
    where: {
      userId_type_itemId: {
        userId: user.id,
        type,
        itemId
      }
    },
    create: {
      userId: user.id,
      type,
      itemId
    },
    update: {}
  });

  return NextResponse.json({ favorite });
}

export async function DELETE(req: NextRequest) {
  const userId = await getClerkUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, itemId } = await req.json();
  if (!type || !itemId) {
    return NextResponse.json({ error: "type and itemId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.favorite.deleteMany({
    where: { userId: user.id, type, itemId }
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const userId = await getClerkUserId();
  if (!userId) {
    return NextResponse.json({ favorites: [] });
  }
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    return NextResponse.json({ favorites: [] });
  }
  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id }
  });
  return NextResponse.json({ favorites });
}