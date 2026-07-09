import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractValue(body: string, key: string) {
  const xmlPattern = new RegExp(`<key>${key}</key>\\s*<string>([^<]*)</string>`, "i");
  const xmlMatch = body.match(xmlPattern);
  if (xmlMatch?.[1]) return xmlMatch[1].trim();

  const plainPattern = new RegExp(`${key}[^A-Z0-9_-]+([A-Z0-9-]{8,})`, "i");
  const plainMatch = body.match(plainPattern);
  if (plainMatch?.[1]) return plainMatch[1].trim();

  return "";
}

function xmlEscape(value: string) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeProfile(origin: string, token: string, udid: string, product: string, version: string) {
  const resultUrl = new URL("/udid/result", origin);
  if (udid) resultUrl.searchParams.set("udid", udid);
  if (product) resultUrl.searchParams.set("product", product);
  if (version) resultUrl.searchParams.set("version", version);

  const profileUuid = crypto.randomUUID().toUpperCase();
  const webclipUuid = crypto.randomUUID().toUpperCase();
  const safeToken = token.replace(/[^a-zA-Z0-9.-]/g, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
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
      <string>N1 UDID</string>
      <key>Precomposed</key>
      <false/>
      <key>PayloadDescription</key>
      <string>N1 Store UDID result shortcut.</string>
      <key>PayloadDisplayName</key>
      <string>N1 UDID Result</string>
      <key>PayloadIdentifier</key>
      <string>com.n1store.udid.webclip.${xmlEscape(safeToken)}</string>
      <key>PayloadOrganization</key>
      <string>N1 Store</string>
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
  <string>N1 Store received your device request. This profile only adds a removable UDID result shortcut.</string>
  <key>PayloadDisplayName</key>
  <string>N1 Store UDID Complete</string>
  <key>PayloadIdentifier</key>
  <string>com.n1store.udid.complete.${xmlEscape(safeToken)}</string>
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
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || `n1-${Date.now()}`;

  let raw = "";
  try {
    raw = await req.text();
  } catch {
    raw = "";
  }

  const udid = extractValue(raw, "UDID");
  const product = extractValue(raw, "PRODUCT");
  const version = extractValue(raw, "VERSION");

  const mobileconfig = makeProfile(req.nextUrl.origin, token, udid, product, version);

  return new NextResponse(mobileconfig, {
    status: 200,
    headers: {
      "Content-Type": "application/x-apple-aspen-config",
      "Content-Disposition": 'attachment; filename="N1-Store-UDID-Complete.mobileconfig"',
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Length": String(Buffer.byteLength(mobileconfig, "utf8")),
    },
  });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || `n1-${Date.now()}`;
  const mobileconfig = makeProfile(req.nextUrl.origin, token, "", "", "");

  return new NextResponse(mobileconfig, {
    status: 200,
    headers: {
      "Content-Type": "application/x-apple-aspen-config",
      "Content-Disposition": 'attachment; filename="N1-Store-UDID-Complete.mobileconfig"',
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Length": String(Buffer.byteLength(mobileconfig, "utf8")),
    },
  });
}
