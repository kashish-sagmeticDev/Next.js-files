// middleware.js
import { NextResponse } from 'next/server';

export default function middleware(request) {
  const url = request.nextUrl.pathname;
  if (url.startsWith('/admin')) {
    // You can implement a more secure check, but for demo we rely on the AdminGuard component.
    // This is optional – you can also let the client component handle it.
    // I'll just allow all admin routes, but the AdminGuard inside will prompt for password.
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};