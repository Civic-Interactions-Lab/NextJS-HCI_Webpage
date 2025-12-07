// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware - pathname:", request.nextUrl.pathname);

  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  console.log("Middleware - setting header:", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
