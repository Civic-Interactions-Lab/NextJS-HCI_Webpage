import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    return NextResponse.json(
      { error: "Server misconfiguration: SITE_PASSWORD is not set." },
      { status: 500 }
    );
  }

  if (password !== sitePassword) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
