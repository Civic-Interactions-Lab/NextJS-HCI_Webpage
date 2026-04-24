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

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const sitePassword = process.env.SITE_PASSWORD?.trim() || "";

  if (!sitePassword) {
    return NextResponse.json({ success: true });
  }

  if (password !== sitePassword) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.nextUrl.protocol === "https:";

  response.cookies.set({
    name: SITE_COOKIE,
    value: await hashPassword(sitePassword),
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps,
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  return response;
}
