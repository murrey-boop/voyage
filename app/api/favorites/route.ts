import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, itemId } = await req.json();
  if (!type || !itemId) {
    return NextResponse.json({ error: "type and itemId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, itemId } = await req.json();
  if (!type || !itemId) {
    return NextResponse.json({ error: "type and itemId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.favorite.deleteMany({
    where: { userId: user.id, type, itemId }
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ favorites: [] });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ favorites: [] });
  }
  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id }
  });
  return NextResponse.json({ favorites });
}