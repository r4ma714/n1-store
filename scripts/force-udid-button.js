const fs = require("fs");
const path = require("path");

const pagePath = path.join(process.cwd(), "app", "page.tsx");

if (!fs.existsSync(pagePath)) {
  console.log("ERROR: app/page.tsx not found");
  process.exit(1);
}

let s = fs.readFileSync(pagePath, "utf8");

// Keep a backup before editing
fs.writeFileSync(path.join(process.cwd(), "app", "page.backup-before-udid.tsx"), s, "utf8");

// 1) Replace common visible button texts
const textPatterns = [
  /کڕین\s*لە\s*Telegram/g,
  /كرین\s*لە\s*Telegram/g,
  /کرین\s*لە\s*Telegram/g,
  /کڕین\s*له\s*Telegram/g,
  /كرین\s*له\s*Telegram/g,
  /کرین\s*له\s*Telegram/g,
  /کڕین\s*لە\s*تێلەگرام/g,
  /کرین\s*لە\s*تێلەگرام/g,
  /كڕین\s*لە\s*تێلەگرام/g,
  /Buy\s*on\s*Telegram/gi,
  /Telegram/g
];

for (const p of textPatterns) {
  s = s.replace(p, "UDID");
}

// 2) Force buttons/links that now show UDID to go to /udid
s = s.replace(/<a([^>]*?)href=(["'])(.*?)\2([^>]*?)>(\s*)UDID(\s*)<\/a>/g, '<a$1href="/udid"$4>$5UDID$6</a>');

// 3) If there is a primary button still linked to Telegram, change only primary/CTA-looking links
s = s.replace(/<a([^>]*className=(["'])(?:(?!\2).)*(btnPrimary|btnSecondary|chooseBtn|telegram|cta|button|btn)(?:(?!\2).)*\2[^>]*)href=(["'])(https:\/\/t\.me\/the_moon_dev|https:\/\/telegram\.me\/the_moon_dev|#contact|#)(["'])([^>]*)>(.*?)<\/a>/gis, (m, p1, q1, cls, q2, href, q3, p7, inner) => {
  if (inner.includes("Admin") || inner.includes("Rules")) return m;
  return `<a${p1}href="/udid"${p7}>UDID</a>`;
});

// 4) Last safety: if exact button text remains with split whitespace, change it
s = s.replace(/(<a[^>]*)(href=["'][^"']*["'])([^>]*>\s*)[^<]*Telegram[^<]*(\s*<\/a>)/gi, (m, a, href, mid, end) => {
  if (m.includes("Admin") || m.includes("Rules")) return m;
  return `${a}href="/udid"${mid}UDID${end}`;
});

fs.writeFileSync(pagePath, s, "utf8");
console.log("DONE: Home Telegram button changed to UDID. Refresh browser with Ctrl+R.");
