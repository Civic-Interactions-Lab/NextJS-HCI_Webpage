// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SITE_COOKIE = "hci_site_verified";

async function hashPassword(password: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add the pathname as a custom header
  response.headers.set("x-current-path", request.nextUrl.pathname);

  const sitePassword = process.env.SITE_PASSWORD?.trim() || "";
  const pathname = request.nextUrl.pathname;

  if (!sitePassword) {
    return response;
  }

  const expectedCookie = await hashPassword(sitePassword);
  const verifiedCookie = request.cookies.get(SITE_COOKIE)?.value;
  const isVerified = verifiedCookie === expectedCookie;
  const isVerifyRoute = pathname === "/verify";

  if (!isVerified && !isVerifyRoute) {
    const verifyUrl = request.nextUrl.clone();
    verifyUrl.pathname = "/verify";
    verifyUrl.searchParams.set(
      "from",
      `${pathname}${request.nextUrl.search}`
    );

    return NextResponse.redirect(verifyUrl);
  }

  if (isVerified && isVerifyRoute) {
    const redirectTo = request.nextUrl.searchParams.get("from") || "/";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - all common public/static asset file types
     */
    "/((?!api|_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mov)).*)",
  ],
};
