import { NextRequest, NextResponse } from "next/server";
import { udidStore } from "../store";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "default";
  const device = udidStore.get(token) || null;
  return NextResponse.json({ ok: true, device }, { headers: { "Cache-Control": "no-store" } });
}
