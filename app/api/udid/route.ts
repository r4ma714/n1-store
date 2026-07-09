function readValue(body: string, key: string) {
  const pattern = new RegExp(`<key>${key}</key>\\s*<string>([^<]*)</string>`, "i");
  const match = body.match(pattern);
  return match?.[1] || "";
}

export async function POST(request: Request) {
  const body = await request.text();
  const udid = readValue(body, "UDID");
  const product = readValue(body, "PRODUCT");
  const version = readValue(body, "VERSION");

  const redirect = new URL("/udid/result", request.url);
  redirect.searchParams.set("udid", udid || "UDID_NOT_FOUND");
  redirect.searchParams.set("product", product || "iPhone");
  redirect.searchParams.set("version", version || "iOS");

  return Response.redirect(redirect.toString(), 302);
}

export async function GET(request: Request) {
  const redirect = new URL("/udid", request.url);
  return Response.redirect(redirect.toString(), 302);
}
