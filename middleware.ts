import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Restrict /admin to logged-in users
  // You can read cookies, headers, etc. here
  const isLoggedIn = Boolean(request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token"));
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Optionally configure matcher
export const config = {
  matcher: ["/admin/:path*"],
};