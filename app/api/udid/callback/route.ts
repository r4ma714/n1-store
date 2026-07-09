import { NextRequest, NextResponse } from "next/server";
import { udidStore } from "../store";

function extractValue(body: string, key: string) {
  const patterns = [
    new RegExp(`<key>${key}</key>\\s*<string>([^<]*)</string>`, "i"),
    new RegExp(`<key>${key}</key>\\s*<data>([^<]*)</data>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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
    iccid: extractValue(raw, "ICCID"),
    raw: raw.slice(0, 5000),
    createdAt: new Date().toISOString(),
  };

  udidStore.set(token, device);

  const resultUrl = new URL("/udid/result", req.nextUrl.origin);
  if (device.udid) resultUrl.searchParams.set("udid", device.udid);
  if (device.product) resultUrl.searchParams.set("product", device.product);
  if (device.version) resultUrl.searchParams.set("version", device.version);

  // IMPORTANT:
  // iOS rejects an empty final profile and shows:
  // "Profile Installation Failed — Empty profile".
  // So we return a tiny valid Web Clip profile instead.
  const profileUuid = crypto.randomUUID().toUpperCase();
  const webclipUuid = crypto.randomUUID().toUpperCase();

  const mobileconfig = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>FullScreen</key>
      <false/>
      <key>IsRemovable</key>
      <true/>
      <key>Label</key>
      <string>N1 UDID Result</string>
      <key>PayloadDescription</key>
      <string>Shortcut to your N1 Store UDID result.</string>
      <key>PayloadDisplayName</key>
      <string>N1 UDID Result</string>
      <key>PayloadIdentifier</key>
      <string>com.n1store.udid.webclip.${xmlEscape(token)}</string>
      <key>PayloadType</key>
      <string>com.apple.webClip.managed</string>
      <key>PayloadUUID</key>
      <string>${webclipUuid}</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>URL</key>
      <string>${xmlEscape(resultUrl.toString())}</string>
    </dict>
  </array>
  <key>PayloadDescription</key>
  <string>UDID received by N1 Store. You can remove this profile after registration.</string>
  <key>PayloadDisplayName</key>
  <string>N1 Store UDID Complete</string>
  <key>PayloadIdentifier</key>
  <string>com.n1store.udid.complete.${xmlEscape(token)}</string>
  <key>PayloadOrganization</key>
  <string>N1 Store</string>
  <key>PayloadRemovalDisallowed</key>
  <false/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>${profileUuid}</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`;

  return new NextResponse(mobileconfig, {
    headers: {
      "Content-Type": "application/x-apple-aspen-config; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/udid", req.nextUrl.origin));
}
