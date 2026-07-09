import { NextRequest, NextResponse } from "next/server";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || `n1-${Date.now()}`;
  const callbackUrl = new URL(`/api/udid/callback?token=${encodeURIComponent(token)}`, req.nextUrl.origin).toString();
  const uuid = crypto.randomUUID().toUpperCase();

  const mobileconfig = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <dict>
    <key>URL</key>
    <string>${xmlEscape(callbackUrl)}</string>
    <key>DeviceAttributes</key>
    <array>
      <string>UDID</string>
      <string>DEVICE_NAME</string>
      <string>VERSION</string>
      <string>PRODUCT</string>
      <string>SERIAL</string>
      <string>IMEI</string>
      <string>ICCID</string>
    </array>
  </dict>
  <key>PayloadOrganization</key>
  <string>N1 Store</string>
  <key>PayloadDisplayName</key>
  <string>N1 Store UDID Profile</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadUUID</key>
  <string>${uuid}</string>
  <key>PayloadIdentifier</key>
  <string>com.n1store.udid.${xmlEscape(token)}</string>
  <key>PayloadDescription</key>
  <string>This temporary profile asks your iPhone or iPad for UDID so N1 Store can register the device.</string>
  <key>PayloadType</key>
  <string>Profile Service</string>
</dict>
</plist>`;

  return new NextResponse(mobileconfig, {
    headers: {
      "Content-Type": "application/x-apple-aspen-config; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"N1-Store-UDID.mobileconfig\"",
      "Cache-Control": "no-store",
    },
  });
}
