import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.redirect("https://n1-store.netlify.app/N1-Store-UDID.mobileconfig");
}
