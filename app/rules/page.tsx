const telegram = "https://t.me/the_moon_dev";

const rules = [
  {
    title: "کڕین لە Telegram",
    text: "هەموو order و پشتیوانی لە Telegram دەکرێت. پێش پارەدان package ـەکەت بە وردی هەڵبژێرە.",
  },
  {
    title: "پارەدان",
    text: "FastPay، ZainCash، FIB و Areeba پشتگیری دەکرێن. دوای پارەدان screenshot یان receipt بنێرە.",
  },
  {
    title: "UDID",
    text: "بۆ signing پێویستە UDID ـی ئامێرەکەت بنێریت. ڕێنمایی لە Telegram پێدەدرێت.",
  },
  {
    title: "Warranty",
    text: "Basic دوو مانگ، Gold چوار مانگ، VIP دە مانگ warranty هەیە. Warranty بە پێی ڕێسای package کار دەکات.",
  },
  {
    title: "کاتێک پێدەچێت",
    text: "چالاککردن پشت بە order، پارەدان و وردەکاری UDID دەبەستێت. لە Telegram دۆخی order ـەکەت پێدەوترێت.",
  },
  {
    title: "پشتیوانی",
    text: "ئەگەر کێشەی install، revoke، UDID یان package هەبوو، ڕاستەوخۆ پەیوەندی بکە بە @the_moon_dev.",
  },
];

export default function RulesPage() {
  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="/">
          <img className="logoImg" src="/n1-logo.png" alt="N1 Store Logo" />
          <div>
            <h1>N1 Store</h1>
            <p>Rules & Warranty</p>
          </div>
        </a>
        <div className="navLinks">
          <a href="/">Home</a>
          <a href={telegram} target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </nav>

      <section className="rulesPage">
        <div className="sectionHeader">
          <p>Rules</p>
          <h2>ڕێسا و Warranty ـی N1 Store</h2>
          <span className="subText">ئەم پەڕەیە بۆ ئەوەی کڕیار پێش کڕین دڵنیا بێت.</span>
        </div>

        <div className="rulesGrid">
          {rules.map((rule) => (
            <div className="ruleCard" key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </div>
          ))}
        </div>

        <div className="contact">
          <h2>پرسیارت هەیە؟</h2>
          <p>بۆ ڕوونکردنەوەی زیاتر لە Telegram نامە بنێرە.</p>
          <a className="btnPrimary" href={telegram} target="_blank" rel="noreferrer">پەیوەندی لە Telegram</a>
        </div>
      </section>
    </main>
  );
}
