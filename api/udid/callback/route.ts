import { NextRequest, NextResponse } from "next/server";
import { udidStore } from "../store";

function extractValue(body: string, key: string) {
  const patterns = [
    new RegExp(`<key>${key}</key>\\s*<string>([^<]*)</string>`, "i"),
    new RegExp(`<key>${key}</key>\\s*<data>([^<]*)</data>`, "i"),
    new RegExp(`${key}[^A-Z0-9a-fA-F-]{0,50}([A-Fa-f0-9-]{8,})`, "i"),
  ];

  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "default";
  const raw = await req.text();

  const device = {
    udid: extractValue(raw, "UDID"),
    product: extractValue(raw, "PRODUCT"),
    version: extractValue(raw, "VERSION"),
    deviceName: extractValue(raw, "DEVICE_NAME"),
    serial: extractValue(raw, "SERIAL"),
    imei: extractValue(raw, "IMEI"),
    raw: raw.slice(0, 5000),
    createdAt: new Date().toISOString(),
  };

  udidStore.set(token, device);

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array/>
  <key>PayloadOrganization</key>
  <string>N1 Store</string>
  <key>PayloadDisplayName</key>
  <string>N1 Store UDID Received</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadUUID</key>
  <string>${crypto.randomUUID().toUpperCase()}</string>
  <key>PayloadIdentifier</key>
  <string>com.n1store.udid.received</string>
  <key>PayloadDescription</key>
  <string>UDID received by N1 Store. You can remove this profile after registration.</string>
  <key>PayloadType</key>
  <string>Configuration</string>
</dict>
</plist>`,
    {
      headers: {
        "Content-Type": "application/x-apple-aspen-config; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function GET() {
  return NextResponse.redirect(new URL("/udid", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
