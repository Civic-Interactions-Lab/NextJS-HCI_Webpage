import { clerkMiddleware } from "@clerk/nextjs/server";
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

function getSafeRedirectPath(pathname: string | null) {
  return pathname?.startsWith("/") ? pathname : "/";
}

function isApiRoute(pathname: string) {
  return pathname.startsWith("/api/") || pathname.startsWith("/trpc");
}

const requestMiddleware = clerkMiddleware(async (_auth, request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  response.headers.set("x-current-path", pathname);

  if (isApiRoute(pathname)) {
    return response;
  }

  const sitePassword = process.env.SITE_PASSWORD?.trim() || "";

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
    verifyUrl.searchParams.set("from", `${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(verifyUrl);
  }

  if (isVerified && isVerifyRoute) {
    const redirectTo = getSafeRedirectPath(
      request.nextUrl.searchParams.get("from")
    );

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return response;
});

export default requestMiddleware;
