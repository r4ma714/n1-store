"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./AdminCpl.module.css";

const PASSWORD = "n1admin2026";

const navGroups = [
  {
    title: "Main",
    items: [
      ["🏠", "Home Page", "/admin-cpl"],
      ["🔎", "search management", "/admin-cpl/search"],
      ["📥", "manage orders", "/admin-cpl/orders"],
      ["📩", "inbox", "/admin-cpl/inbox"],
      ["🟢", "online now", "/admin-cpl/onlines"],
    ],
  },
  {
    title: "Settings",
    items: [
      ["⚙️", "Website Settings", "/admin-cpl/settings"],
      ["📧", "Email settings", "/admin-cpl/email-settings"],
      ["💰", "Payment settings", "/admin-cpl/payments-settings"],
      ["🌐", "General settings", "/admin-cpl/general-settings"],
      ["📱", "Application settings", "/admin-cpl/apps-settings"],
      ["🤖", "Telegram notifications", "/admin-cpl/telegram-notifications"],
    ],
  },
  {
    title: "Plugins",
    items: [
      ["⬆️", "upload center management", "/admin-cpl/upload-center"],
      ["📰", "admin site news", "/admin-cpl/news-mangment"],
      ["🎨", "manage icons", "/admin-cpl/icons-mangment"],
      ["🖼️", "manage slideshow", "/admin-cpl/slideshow-mangment"],
      ["🌌", "manage backgrounds", "/admin-cpl/backgrounds-mangment"],
      ["🏷️", "discount coupons", "/admin-cpl/discount-coupon"],
    ],
  },
  {
    title: "Website Pages",
    items: [
      ["📄", "manage static pages", "/admin-cpl/static-pages"],
      ["📑", "additional pages", "/admin-cpl/additional-pages"],
    ],
  },
  {
    title: "Subscriptions",
    items: [
      ["🍎", "IOS Manage Groups", "/admin-cpl/ipa-groups-mangment"],
      ["📲", "IOS Manage applications", "/admin-cpl/ipa-apps-mangment"],
      ["🛠️", "auto fix groups", "/admin-cpl/fix-ipa-groups"],
      ["🔔", "application notifications", "/admin-cpl/ipa-store-mangment"],
      ["🧬", "Dylib management", "/admin-cpl/ipa-apps-dylib"],
      ["📦", "Paid application package", "/admin-cpl/ipa-apps-package"],
      ["🤖", "Android Manage applications", "/admin-cpl/android/apps"],
      ["👥", "Android Manage Groups", "/admin-cpl/android"],
      ["📦", "Android package", "/admin-cpl/android-package"],
    ],
  },
  {
    title: "Sales",
    items: [
      ["🏷️", "Find a coupon", "/admin-cpl/coupons/serach"],
      ["➕", "Add new coupon", "/admin-cpl/coupons/new-coupons"],
      ["🏷️", "coupon management", "/admin-cpl/coupons"],
      ["💳", "Add new card", "/admin-cpl/cards/new-card"],
      ["🗂️", "Add new card group", "/admin-cpl/cards/new-card-group"],
      ["💳", "card management", "/admin-cpl/cards"],
      ["🔐", "Add new codes", "/admin-cpl/direct-codes/add-new-codes"],
      ["🔐", "code management", "/admin-cpl/direct-codes"],
      ["🛒", "Add new item", "/admin-cpl/shop/new-product"],
      ["➕", "Add new section", "/admin-cpl/shop/new-category"],
      ["🛒", "store management", "/admin-cpl/shop"],
      ["👤", "Store member management", "/admin-cpl/members"],
      ["☁️", "icloud service", "/admin-cpl/icloud-unlock-services"],
      ["ℹ️", "About App", "/admin-cpl/about"],
    ],
  },
];

export default function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setUnlocked(localStorage.getItem("n1_admin_unlocked") === "yes");
  }, []);

  function login(e: FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem("n1_admin_unlocked", "yes");
      setUnlocked(true);
    } else {
      alert("Password هەڵەیە");
    }
  }

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return navGroups;
    return navGroups.map((group) => ({
      ...group,
      items: group.items.filter((item) => item[1].toLowerCase().includes(query.toLowerCase())),
    })).filter((group) => group.items.length);
  }, [query]);

  if (!unlocked) {
    return (
      <main className={styles.loginPage}>
        <form className={styles.loginCard} onSubmit={login}>
          <div className={styles.logo}>N1</div>
          <h1>admin dashboard</h1>
          <p>Login بۆ Admin CPL ـی N1 Store</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Admin password" />
          <button>Login</button>
          <span>Password: n1admin2026</span>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.leftbar}>
        <div className={styles.logobar}>
          <h2>admin dashboard</h2>
          <span>N1 Store PRO</span>
        </div>

        <input className={styles.sideSearch} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu..." />

        <nav className={styles.nav}>
          {filteredGroups.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <p>{group.title}</p>
              {group.items.map(([icon, label, href]) => (
                <Link key={href} href={href}>
                  <span>{icon}</span>
                  <strong>{label}</strong>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <button className={styles.collapse}>collapse</button>
      </aside>

      <section className={styles.rightbar}>
        <header className={styles.topbar}>
          <form action="/admin-cpl/search" className={styles.searchbar}>
            <input name="q" placeholder="Enter the user name..." />
            <button>Search</button>
          </form>
          <div className={styles.topLinks}>
            <Link href="/">Home Page</Link>
            <a href="https://t.me/the_moon_dev" target="_blank">Telegram</a>
            <button onClick={() => { localStorage.removeItem("n1_admin_unlocked"); setUnlocked(false); }}>Logout</button>
          </div>
        </header>

        <section className={styles.breadcrumbbar}>
          <div>
            <h1>{title}</h1>
            <p>profile / dashboard / {title}</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event("n1-backup"))}>database copy</button>
        </section>

        {children}
      </section>
    </main>
  );
}
