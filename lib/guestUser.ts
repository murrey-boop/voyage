import { prisma } from "@/lib/prisma";

export async function findOrCreateGuest(email: string, phoneNumber?: string) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        name: "Guest",
        password: "", // empty, cannot login by credentials
      },
    });
  }
  return user;
}