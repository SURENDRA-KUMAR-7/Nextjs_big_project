import { NextResponse } from 'next/server'
import { verifyAuth } from '@/auth/verifyToken';
 
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/' || path === '/api/login' || path === '/api/signup';
  const token = request.cookies.get("authToken")?.value || '';
  const isVerified = await verifyAuth(token);

  if(isPublicPath && isVerified.success){
    return NextResponse.redirect(new URL('/user', request.nextUrl));
  }

  if(!isPublicPath && !(isVerified.success)){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/' , '/api/:path*', '/login', '/signup', '/user/:path*']
}