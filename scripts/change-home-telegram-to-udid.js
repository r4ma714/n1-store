const fs = require("fs");
const path = require("path");

const pagePath = path.join(process.cwd(), "app", "page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("ERROR: app/page.tsx not found. Put this script inside your N1 project and run again.");
  process.exit(1);
}

let page = fs.readFileSync(pagePath, "utf8");

const before = page;

const replacements = [
  ["کڕین لە Telegram", "UDID"],
  ["کرین لە Telegram", "UDID"],
  ["كڕین لە Telegram", "UDID"],
  ["کڕین لە تێلەگرام", "UDID"],
  ["پەیوەندی لە Telegram", "UDID"],
  ["Telegram ـەکەت بکەرەوە", "UDID"],
  ["Telegram", "UDID"],
];

for (const [from, to] of replacements) {
  page = page.replaceAll(from, to);
}

// Make only the obvious CTA links go to /udid when they now show UDID.
// This keeps admin/nav links safer and avoids changing the whole site.
page = page.replace(/<a([^>]*className=["'][^"']*(?:btnPrimary|telegram|float|chooseBtn)[^"']*["'][^>]*)href=["'][^"']*["']([^>]*)>UDID<\/a>/g, '<a$1href="/udid"$2>UDID</a>');
page = page.replace(/<a([^>]*)href=["']https:\/\/t\.me\/the_moon_dev["']([^>]*)>UDID<\/a>/g, '<a$1href="/udid"$2>UDID</a>');
page = page.replace(/<a([^>]*)href=["']https:\/\/telegram\.me\/the_moon_dev["']([^>]*)>UDID<\/a>/g, '<a$1href="/udid"$2>UDID</a>');

// Fix overly broad replacement in navbar if Admin/Rules still exist and a nav item became UDID unexpectedly.
// If a standalone nav link to Telegram became UDID, point it to /udid, which is what we want.
page = page.replace(/<a([^>]*)href=["'][^"']*["']([^>]*)>UDID<\/a>/g, (match, p1, p2) => {
  if (match.includes('href="/admin"') || match.includes("href='/admin'") || match.includes('href="/rules"') || match.includes("href='/rules'")) {
    return match;
  }
  return `<a${p1}href="/udid"${p2}>UDID</a>`;
});

if (before === page) {
  console.log("No matching text found. I will still create a small UDID button note.");
} else {
  fs.writeFileSync(pagePath, page, "utf8");
  console.log("Done: Telegram buy text changed to UDID and linked to /udid where possible.");
}
