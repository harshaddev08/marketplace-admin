import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Paths that are excluded from auth checks (e.g., static files, login page)
  // We want to protect everything by default except specific paths
  const isPublicPath =
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api"); // If we have internal API routes, usually we rely on backend auth, but for admin panel UI accessing valid routes

  if (isPublicPath) {
    // If user is already logged in and tries to access login page, redirect to dashboard
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
