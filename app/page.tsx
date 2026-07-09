const telegram = "https://t.me/the_moon_dev";

function tg(message: string) {
  return `${telegram}?text=${encodeURIComponent(message)}`;
}

const features = [
  {
    icon: "⚡",
    title: "IPA Install",
    text: "Install کردنی IPA و ئەپەکان بە ڕێنمایی خێرا لە Telegram.",
  },
  {
    icon: "🛡️",
    title: "Anti-Revoke",
    text: "پاراستنی باشتر بۆ ئەوەی ئەپەکان زوو نەوەستن و بە ئارامی کار بکەن.",
  },
  {
    icon: "📱",
    title: "iPhone / iPad",
    text: "پشتگیری بۆ iPhone و iPad بە package ـە جیاوازەکان.",
  },
  {
    icon: "💬",
    title: "Telegram Support",
    text: "کڕین، UDID، پارەدان و پشتیوانی هەمووی لە @the_moon_dev.",
  },
];

const trustItems = [
  { number: "12M", title: "ساڵێک Access", text: "یەک جار پارەدان بۆ 12 مانگ." },
  { number: "24/7", title: "پشتیوانی خێرا", text: "پەیوەندی ڕاستەوخۆ لە Telegram." },
  { number: "4", title: "Payment Methods", text: "FastPay، ZainCash، FIB و Areeba." },
  { number: "✓", title: "Warranty", text: "Warranty بە پێی package ـەکەت." },
];

const steps = [
  { title: "Package هەڵبژێرە", text: "Basic، Gold یان VIP بەپێی پێویستیت هەڵبژێرە." },
  { title: "بچۆ Telegram", text: "لە دوگمەی کڕین کلیک بکە و پەیوەندی بکە بە @the_moon_dev." },
  { title: "UDID و پارەدان", text: "وردەکاری UDID و ژمارەی پارەدان لە Telegram پێدەدرێت." },
  { title: "چالاککردن", text: "دوای پشتڕاستکردن، خزمەتگوزارییەکەت چالاک دەکرێت." },
];

const plans = [
  {
    name: "Basic",
    price: "20,000 IQD",
    badge: "دەستپێک",
    warranty: "2 مانگ Warranty",
    highlight: false,
    items: [
      "12 مانگ Access",
      "Store Access",
      "Install External IPAs",
      "Anti-Revoke Protection",
      "Secure Downloads",
      "Priority Support",
    ],
  },
  {
    name: "Gold",
    price: "25,000 IQD",
    badge: "باشترین نرخ",
    warranty: "4 مانگ Warranty",
    highlight: true,
    items: [
      "12 مانگ Access",
      "15,000+ Apps & Games",
      "Jodel Unban",
      "Ad-Free Experience",
      "High-Speed Servers",
      "Daily Updates",
    ],
  },
  {
    name: "VIP",
    price: "50,000 IQD",
    badge: "Recommended",
    warranty: "10 مانگ Warranty",
    highlight: false,
    items: [
      "12 مانگ Access",
      "Export P12 & MobileProvision",
      "Support ESign / GBox / Scarlet",
      "Custom App Icons & Names",
      "Game Center & Push Notifications",
      "App Version History",
    ],
  },
];

const comparison = [
  ["12 مانگ Access", "✓", "✓", "✓"],
  ["Install External IPAs", "✓", "✓", "✓"],
  ["Anti-Revoke", "✓", "✓", "✓"],
  ["Apps & Games", "9K+", "15K+", "15K+"],
  ["Warranty", "2M", "4M", "10M"],
  ["P12 & MobileProvision", "—", "—", "✓"],
  ["Custom Icons & Names", "—", "—", "✓"],
  ["Best for", "New users", "Most users", "Power users"],
];

const payments = ["FastPay", "ZainCash", "FIB", "Areeba"];

const reviews = [
  { name: "Customer", text: "پشتیوانی خێرا و ڕێنمایی بە ئاسانی. Package ـەکەم زوو چالاک بوو." },
  { name: "iPhone User", text: "Website پاکە و Telegram ـیش زۆر خێرا وەڵام دەداتەوە." },
  { name: "VIP User", text: "بۆ IPA و signing زۆر بەکەڵکە، تایبەتمەندییەکانی VIP باشن." },
];

const faqs = [
  {
    q: "چۆن package بکڕم؟",
    a: "Package هەڵبژێرە و لە Telegram نامە بنێرە. پاشان وردەکاری پارەدان و UDID پێدەدرێت.",
  },
  {
    q: "پارەدان چۆنە؟",
    a: "FastPay، ZainCash، FIB و Areeba پشتگیری دەکرێن. ژمارە و وردەکاری پارەدان لە Telegram پێدەدرێت.",
  },
  {
    q: "UDID چییە؟",
    a: "UDID ناسنامەی تایبەتی ئامێری iPhone/iPad ـە. بۆ signing زۆرجار پێویست دەبێت.",
  },
  {
    q: "Warranty چۆنە؟",
    a: "Warranty بە پێی package ـەکە دەگۆڕێت: Basic دوو مانگ، Gold چوار مانگ، VIP دە مانگ.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#top" aria-label="N1 Store">
          <img className="logoImg" src="/n1-logo.png" alt="N1 Store Logo" />
          <div>
            <h1>N1 Store</h1>
            <p>Premium iOS Signing</p>
          </div>
        </a>

        <div className="navLinks">
          <a href="#features">خزمەتگوزاری</a>
          <a href="#pricing">نرخەکان</a>
          <a href="#compare">جیاوازی</a>
          <a href="/rules">Rules</a>
          <a href="/admin">Admin</a>
          <a href={telegram} target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="heroText">
          <div className="badge">🚀 Trusted iPhone Signing Platform</div>
          <h2>
            Sign iOS Apps <span>Without Limits</span>
          </h2>
          <p>
            N1 Store بۆ install کردنی IPA، premium apps، anti-revoke، warranty و پشتیوانی خێرا.
            فرۆشتن و چالاککردن هەمووی لە Telegram دەکرێت.
          </p>

          <div className="heroButtons">
            <a className="btnPrimary" href="/udid">UDID</a>
            <a className="btnSecondary" href="#pricing">بینینی Package ـەکان</a>
          </div>

          <div className="stats">
            <div><strong>12</strong><span>Months</span></div>
            <div><strong>15K+</strong><span>Apps & Games</span></div>
            <div><strong>24/7</strong><span>Support</span></div>
          </div>
        </div>

        <div className="phoneCard">
          <div className="phoneTop"></div>
          <img className="appIconImg" src="/n1-logo.png" alt="N1 Store App Icon" />
          <h3>N1 Store</h3>
          <p>Premium signing with Telegram support.</p>
          <div className="miniGrid">
            <span>IPA</span>
            <span>UDID</span>
            <span>P12</span>
            <span>VIP</span>
          </div>
        </div>
      </section>

      <section id="trust" className="section">
        <div className="sectionHeader">
          <p>Trust</p>
          <h2>بۆچی کڕیار باوەڕ بکات؟</h2>
          <span className="subText">Website بۆ ناساندنە؛ کڕین و پشتیوانی ڕاستەوخۆ لە Telegram.</span>
        </div>
        <div className="trustGrid">
          {trustItems.map((item) => (
            <div className="trustCard" key={item.title}>
              <strong>{item.number}</strong>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="section">
        <div className="sectionHeader">
          <p>How It Works</p>
          <h2>چۆن کار دەکات؟</h2>
        </div>
        <div className="howGrid">
          {steps.map((step, index) => (
            <div className="stepCard" key={step.title}>
              <div className="stepNumber">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHeader">
          <p>Features</p>
          <h2>چی لە N1 Store ـدا هەیە؟</h2>
        </div>
        <div className="featureGrid">
          {features.map((feature) => (
            <div className="card" key={feature.title}>
              <div className="cardIcon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="sectionHeader">
          <p>Packages</p>
          <h2>نرخەکانی N1 Store</h2>
          <span className="subText">یەک جار پارەدان بۆ ساڵێک. بۆ کڕین کلیک بکە و بچۆ Telegram.</span>
        </div>
        <div className="pricingGrid">
          {plans.map((plan) => (
            <div className={`priceCard ${plan.highlight ? "vip" : ""}`} key={plan.name}>
              <span className="planBadge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <h4>{plan.price}</h4>
              <p>{plan.warranty}</p>
              <ul>
                {plan.items.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
              <a className="chooseBtn" href={tg(`Slaw, damawet package ${plan.name} bkrem bo N1 Store`)} target="_blank" rel="noreferrer">
                کڕینی {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="compare" className="section">
        <div className="sectionHeader">
          <p>Compare</p>
          <h2>جیاوازی Package ـەکان</h2>
        </div>
        <div className="compareBox">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic</th>
                <th>Gold</th>
                <th>VIP</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => <td key={cell}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section splitSection">
        <div className="infoPanel">
          <p className="eyebrow">Payment</p>
          <h2>ڕێگاکانی پارەدان</h2>
          <p>ئەم ڕێگایانە پشتگیری دەکرێن. وردەکاری و ژمارەی پارەدان لە Telegram پێدەدرێت.</p>
          <div className="paymentGrid">
            {payments.map((payment) => <span key={payment}>{payment}</span>)}
          </div>
        </div>
        <div className="infoPanel glowPanel">
          <p className="eyebrow">Warranty</p>
          <h2>Warranty و ڕێسا</h2>
          <p>پێش کڕین package ـەکەت بخوێنەوە. کات، warranty و پشتیوانی بە پێی package ـەکەت دەبێت.</p>
          <a className="btnSecondary" href="/rules">بینینی Rules</a>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p>Reviews</p>
          <h2>قسەی کڕیارەکان</h2>
        </div>
        <div className="reviewGrid">
          {reviews.map((review) => (
            <div className="reviewCard" key={review.name}>
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section">
        <div className="sectionHeader">
          <p>FAQ</p>
          <h2>پرسیارە باوەکان</h2>
        </div>
        <div className="faqGrid">
          {faqs.map((faq) => (
            <div className="faqItem" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact">
        <h2>ئامادەیت package ـەکەت هەڵبژێریت؟</h2>
        <p>کلیک بکە و ڕاستەوخۆ نامە بنێرە بۆ Telegram ـی N1 Store.</p>
        <a className="btnPrimary" href={tg("Slaw, package kanm bo N1 Store damawet bzanim")} target="_blank" rel="noreferrer">پەیوەندی لە Telegram</a>
      </section>

      <a className="floatingTelegram" href={telegram} target="_blank" rel="noreferrer">Telegram</a>

      <footer>
        <p>© 2026 N1 Store. All rights reserved.</p>
      </footer>
    </main>
  );
}
