// /encuesta-front/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import MobileDetect from "mobile-detect";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const md = new MobileDetect(userAgent);
  console.log("User-Agent:", userAgent);

  // Detectar si el dispositivo es móvil
  const isMobile = !!md.mobile();
  // Lógica de redirección opcional (comentada en tu caso)
  // if (!isMobile && (request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/survey'))) {
  //   return NextResponse.redirect(new URL('/not-mobile', request.nextUrl.origin));
  // }
}

export const config = {
  matcher: ["/:path*"],
};
