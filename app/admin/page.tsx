"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./N1AdminCpl.module.css";

type Status = "Pending" | "Paid" | "Active" | "Done" | "Cancelled";
type Platform = "iOS" | "Android" | "Cards" | "Shop" | "iCloud";
type PackageName = "Basic" | "Gold" | "VIP";
type PaymentMethod = "FastPay" | "ZainCash" | "FIB" | "Areeba" | "Cash";

type Order = {
  id: string;
  customer: string;
  telegram: string;
  phone: string;
  packageName: PackageName;
  platform: Platform;
  udid: string;
  paymentMethod: PaymentMethod;
  price: number;
  status: Status;
  accessKey: string;
  notes: string;
  createdAt: string;
  expiresAt: string;
};

type AppItem = {
  id: string;
  name: string;
  category: string;
  version: string;
  platform: "iOS" | "Android";
  status: "Available" | "Hidden";
};

type Coupon = {
  id: string;
  code: string;
  discount: string;
  status: "Active" | "Disabled";
};

const PASSWORD = "n1admin2026";

const packagePrices: Record<PackageName, number> = {
  Basic: 20000,
  Gold: 25000,
  VIP: 50000,
};

const emptyOrder: Omit<Order, "id" | "accessKey" | "createdAt"> = {
  customer: "",
  telegram: "",
  phone: "",
  packageName: "Gold",
  platform: "iOS",
  udid: "",
  paymentMethod: "FastPay",
  price: 25000,
  status: "Pending",
  notes: "",
  expiresAt: "",
};

const navItems = [
  { id: "home", icon: "🏠", label: "Home Page" },
  { id: "search", icon: "🔎", label: "search management" },
  { id: "orders", icon: "📥", label: "manage orders" },
  { id: "inbox", icon: "📩", label: "inbox" },
  { id: "online", icon: "🟢", label: "online now", badge: "8" },
  { id: "settings", icon: "⚙️", label: "Settings" },
  { id: "plugins", icon: "🧩", label: "Manage plugins" },
  { id: "pages", icon: "📄", label: "website pages" },
  { id: "ios", icon: "🍎", label: "subscriptions - IOS" },
  { id: "android", icon: "🤖", label: "subscriptions - ANDROID" },
  { id: "coupons", icon: "🏷️", label: "subscription coupons" },
  { id: "cards", icon: "💳", label: "card management" },
  { id: "codes", icon: "🔐", label: "code management" },
  { id: "store", icon: "🛒", label: "store management" },
  { id: "icloud", icon: "☁️", label: "icloud service" },
  { id: "about", icon: "ℹ️", label: "About App" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function oneYearISO() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
}

function money(value: number) {
  return `${Number(value || 0).toLocaleString()} IQD`;
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function downloadText(filename: string, text: string, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  downloadText(filename, csv, "text/csv;charset=utf-8");
}

export default function N1AdminCpl() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("home");
  const [orders, setOrders] = useState<Order[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState(emptyOrder);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showUpdate, setShowUpdate] = useState(true);
  const [showBoost, setShowBoost] = useState(true);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "10%" });
  const [newApp, setNewApp] = useState({ name: "", category: "Social", version: "1.0", platform: "iOS" as "iOS" | "Android" });
  const [settings, setSettings] = useState({
    storeName: "N1 Store",
    telegram: "@the_moon_dev",
    license: "permanent license",
    version: "PRO EDITION Plus v8.9.8",
  });

  useEffect(() => {
    setOrders(readStorage("n1_orders", []));
    setApps(readStorage("n1_apps", [
      { id: makeId("APP"), name: "Instagram++", category: "Social", version: "330.0", platform: "iOS", status: "Available" },
      { id: makeId("APP"), name: "TikTok Premium", category: "Social", version: "35.1", platform: "iOS", status: "Available" },
      { id: makeId("APP"), name: "Spotify Premium", category: "Music", version: "8.9", platform: "iOS", status: "Available" },
    ]));
    setCoupons(readStorage("n1_coupons", []));
    setSettings(readStorage("n1_settings", {
      storeName: "N1 Store",
      telegram: "@the_moon_dev",
      license: "permanent license",
      version: "PRO EDITION Plus v8.9.8",
    }));
  }, []);

  useEffect(() => localStorage.setItem("n1_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("n1_apps", JSON.stringify(apps)), [apps]);
  useEffect(() => localStorage.setItem("n1_coupons", JSON.stringify(coupons)), [coupons]);
  useEffect(() => localStorage.setItem("n1_settings", JSON.stringify(settings)), [settings]);

  const counts = useMemo(() => {
    const countPlatform = (platform: Platform) => orders.filter((o) => o.platform === platform && o.status === "Pending").length;
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      paid: orders.filter((o) => o.status === "Paid").length,
      active: orders.filter((o) => o.status === "Active").length,
      done: orders.filter((o) => o.status === "Done").length,
      iosPending: countPlatform("iOS"),
      androidPending: countPlatform("Android"),
      cardsPending: countPlatform("Cards"),
      shopPending: countPlatform("Shop"),
      icloudPending: countPlatform("iCloud"),
      visitors: 56506,
      online: 8,
      members: 1149,
      applications: apps.length || 9792,
      signedApps: orders.filter((o) => o.status === "Active").length || 92,
      revenue: orders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + Number(o.price || 0), 0),
    };
  }, [orders, apps]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = `${order.customer} ${order.telegram} ${order.udid} ${order.accessKey} ${order.packageName} ${order.platform}`.toLowerCase();
      const okSearch = text.includes(search.toLowerCase());
      const okStatus = statusFilter === "All" || order.status === statusFilter;
      return okSearch && okStatus;
    });
  }, [orders, search, statusFilter]);

  function login(e: FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) setLoggedIn(true);
    else alert("Password هەڵەیە");
  }

  function updateForm<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    const next = { ...form, [key]: value };
    if (key === "packageName") next.price = packagePrices[value as PackageName];
    setForm(next);
  }

  function submitOrder(e: FormEvent) {
    e.preventDefault();
    if (!form.customer.trim() || !form.telegram.trim()) {
      alert("ناو و Telegram پێویستە");
      return;
    }

    if (editingId) {
      setOrders((items) => items.map((o) => o.id === editingId ? { ...o, ...form, price: Number(form.price) } : o));
      setEditingId(null);
    } else {
      setOrders((items) => [{
        ...form,
        id: makeId("ORD"),
        accessKey: makeId("N1-KEY"),
        createdAt: todayISO(),
        expiresAt: form.expiresAt || oneYearISO(),
      }, ...items]);
    }

    setForm(emptyOrder);
  }

  function editOrder(order: Order) {
    setEditingId(order.id);
    setForm({
      customer: order.customer,
      telegram: order.telegram,
      phone: order.phone,
      packageName: order.packageName,
      platform: order.platform,
      udid: order.udid,
      paymentMethod: order.paymentMethod,
      price: order.price,
      status: order.status,
      notes: order.notes,
      expiresAt: order.expiresAt,
    });
    setTab("orders");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteOrder(id: string) {
    if (confirm("دڵنیایت دەتەوێت ئەم order ـە بسڕیتەوە؟")) {
      setOrders((items) => items.filter((o) => o.id !== id));
    }
  }

  function copyTelegram(order: Order) {
    const message = `N1 Store Order
Customer: ${order.customer}
Telegram: ${order.telegram}
Phone: ${order.phone || "-"}
Package: ${order.packageName}
Platform: ${order.platform}
UDID: ${order.udid || "-"}
Payment: ${order.paymentMethod}
Price: ${money(order.price)}
Status: ${order.status}
Access Key: ${order.accessKey}
Expires: ${order.expiresAt}
Notes: ${order.notes || "-"}`;
    navigator.clipboard.writeText(message);
    alert("Copy کرا بۆ Telegram");
  }

  function exportOrders() {
    exportCsv("n1-orders.csv", [
      ["ID", "Customer", "Telegram", "Phone", "Package", "Platform", "UDID", "Payment", "Price", "Status", "Access Key", "Created", "Expires", "Notes"],
      ...orders.map((o) => [o.id, o.customer, o.telegram, o.phone, o.packageName, o.platform, o.udid, o.paymentMethod, String(o.price), o.status, o.accessKey, o.createdAt, o.expiresAt, o.notes]),
    ]);
  }

  function backupAll() {
    downloadText("n1-backup.json", JSON.stringify({ orders, apps, coupons, settings }, null, 2), "application/json");
  }

  function restoreAll(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || "{}"));
        if (Array.isArray(data.orders)) setOrders(data.orders);
        if (Array.isArray(data.apps)) setApps(data.apps);
        if (Array.isArray(data.coupons)) setCoupons(data.coupons);
        if (data.settings) setSettings(data.settings);
        alert("Restore تەواو بوو");
      } catch {
        alert("فایلی backup هەڵەیە");
      }
    };
    reader.readAsText(file);
  }

  function addCoupon(e: FormEvent) {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    setCoupons((items) => [{ id: makeId("CPN"), code: newCoupon.code.toUpperCase(), discount: newCoupon.discount, status: "Active" }, ...items]);
    setNewCoupon({ code: "", discount: "10%" });
  }

  function addApp(e: FormEvent) {
    e.preventDefault();
    if (!newApp.name.trim()) return;
    setApps((items) => [{ id: makeId("APP"), ...newApp, status: "Available" }, ...items]);
    setNewApp({ name: "", category: "Social", version: "1.0", platform: "iOS" });
  }

  if (!loggedIn) {
    return (
      <main className={styles.loginPage}>
        <form className={styles.loginCard} onSubmit={login}>
          <div className={styles.loginLogo}>N1</div>
          <h1>admin dashboard</h1>
          <p>Login بۆ N1 Store Admin CPL</p>
          <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <span>N1 Store</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button key={item.id} className={tab === item.id ? styles.navActive : ""} onClick={() => setTab(item.id)}>
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
              {item.id === "orders" && counts.pending ? <em>{counts.pending}</em> : null}
              {item.badge ? <em>{item.badge}</em> : null}
            </button>
          ))}
        </nav>

        <button className={styles.collapse}>collapse</button>
      </aside>

      <section className={styles.rightbar}>
        <header className={styles.topbar}>
          <div className={styles.searchbar}>
            <input placeholder="Enter the user name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className={styles.topLinks}>
            <a href="/" target="_blank">Home Page</a>
            <a href="https://t.me/the_moon_dev" target="_blank">Telegram</a>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        </header>

        <section className={styles.breadcrumbbar}>
          <div>
            <h1>{navItems.find((item) => item.id === tab)?.label || "dashboard"}</h1>
            <p>profile / dashboard / N1 Store</p>
          </div>
          <button onClick={backupAll}>Database Copy</button>
        </section>

        {tab === "home" && (
          <>
            <section className={styles.supportHub}>
              <h3>support channels</h3>
              <div className={styles.supportGrid}>
                <a href="https://t.me/the_moon_dev" target="_blank">Support</a>
                <a href="https://t.me/the_moon_dev" target="_blank">iOS Support</a>
                <a href="https://t.me/the_moon_dev" target="_blank">Android Support</a>
                <a href="https://t.me/the_moon_dev" target="_blank">Script Updates</a>
                <a href="https://t.me/the_moon_dev" target="_blank">Apps Updates</a>
                <a href="https://t.me/the_moon_dev" target="_blank">Tutorials</a>
              </div>
            </section>

            {showBoost && (
              <section className={styles.boostat}>
                <button onClick={() => setShowBoost(false)}>×</button>
                <div className={styles.boostatLogo}>★</div>
                <div>
                  <span>New — N1 Digital Services</span>
                  <h2>Ready-to-sell services in your store — Telegram fulfillment</h2>
                  <p>Add ready-made digital services, pricing, packages, cards, codes and subscriptions for N1 Store customers.</p>
                </div>
                <button onClick={() => setTab("store")}>Enable Now</button>
              </section>
            )}

            {showUpdate && (
              <section className={styles.updateAlert}>
                <button onClick={() => setShowUpdate(false)}>×</button>
                <strong>Alert!</strong> There is a new update version, current release version is <b>{settings.version}</b>.
              </section>
            )}

            <section className={styles.quickOrders}>
              <div className={styles.quickHead}>
                <h3>🔔 Quick Orders Alerts</h3>
                <span>{counts.pending} pending orders</span>
              </div>
              <div className={styles.quickGrid}>
                <button onClick={() => { setTab("orders"); setStatusFilter("Pending"); }}>🍎<strong>iOS Orders</strong><em>{counts.iosPending}</em></button>
                <button onClick={() => { setTab("orders"); setStatusFilter("Pending"); }}>🤖<strong>Android Orders</strong><em>{counts.androidPending}</em></button>
                <button onClick={() => { setTab("cards"); }}>💳<strong>Cards Orders</strong><em>{counts.cardsPending}</em></button>
                <button onClick={() => { setTab("store"); }}>🛒<strong>Shop Orders</strong><em>{counts.shopPending}</em></button>
                <button onClick={() => { setTab("icloud"); }}>☁️<strong>iCloud Unlock</strong><em>{counts.icloudPending}</em></button>
              </div>
            </section>

            <section className={styles.dashboardGrid}>
              <div className={styles.cardLarge}>
                <h3>request stats</h3>
                <div className={styles.statCircle}>
                  <strong>{counts.total}</strong>
                  <span>Total orders</span>
                </div>
                <div className={styles.miniStats}>
                  <div><strong>{counts.paid}</strong><span>Paid</span></div>
                  <div><strong>{counts.active}</strong><span>Active</span></div>
                  <div><strong>{counts.done}</strong><span>Done</span></div>
                </div>
              </div>

              <div className={styles.statsColumn}>
                <div><span>number of visitors</span><strong>{counts.visitors.toLocaleString()}</strong></div>
                <div><span>who's online now</span><strong>{counts.online}</strong></div>
                <div><span>applications</span><strong>{counts.applications.toLocaleString()}</strong></div>
                <div><span>signed applications</span><strong>{counts.signedApps}</strong></div>
              </div>

              <div className={styles.serverCard}>
                <h3>server size</h3>
                <p>user: 4.45 TB</p>
                <div><i style={{ width: "28%" }} /></div>
                <p>Available: 11.18 TB</p>
                <div><i style={{ width: "72%" }} /></div>
                <h2>storage 15.62 TB</h2>
                <hr />
                <p>License Type:</p>
                <strong>{settings.license}</strong>
              </div>
            </section>

            <section className={styles.groupGrid}>
              <div>
                <h3>statistics of the last groups added</h3>
                <p>Only auto-activation groups data will be fetched</p>
              </div>
              <div><strong>{counts.members}</strong><span>total of all members</span></div>
              <div><strong>0</strong><span>number of all groups</span></div>
            </section>
          </>
        )}

        {tab === "orders" && (
          <>
            <section className={styles.panel}>
              <h2>{editingId ? "Edit Order" : "Add New Order"}</h2>
              <form className={styles.formGrid} onSubmit={submitOrder}>
                <input placeholder="Customer name" value={form.customer} onChange={(e) => updateForm("customer", e.target.value)} />
                <input placeholder="Telegram username" value={form.telegram} onChange={(e) => updateForm("telegram", e.target.value)} />
                <input placeholder="Phone number" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                <select value={form.packageName} onChange={(e) => updateForm("packageName", e.target.value as PackageName)}>
                  <option>Basic</option><option>Gold</option><option>VIP</option>
                </select>
                <select value={form.platform} onChange={(e) => updateForm("platform", e.target.value as Platform)}>
                  <option>iOS</option><option>Android</option><option>Cards</option><option>Shop</option><option>iCloud</option>
                </select>
                <select value={form.paymentMethod} onChange={(e) => updateForm("paymentMethod", e.target.value as PaymentMethod)}>
                  <option>FastPay</option><option>ZainCash</option><option>FIB</option><option>Areeba</option><option>Cash</option>
                </select>
                <input placeholder="UDID / code / card info" value={form.udid} onChange={(e) => updateForm("udid", e.target.value)} />
                <input type="number" placeholder="Price IQD" value={form.price} onChange={(e) => updateForm("price", Number(e.target.value))} />
                <select value={form.status} onChange={(e) => updateForm("status", e.target.value as Status)}>
                  <option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option>
                </select>
                <input type="date" value={form.expiresAt} onChange={(e) => updateForm("expiresAt", e.target.value)} />
                <textarea placeholder="Notes" value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} />
                <div className={styles.formActions}>
                  <button>{editingId ? "Save Changes" : "Add Order"}</button>
                  {editingId ? <button type="button" onClick={() => { setEditingId(null); setForm(emptyOrder); }}>Cancel Edit</button> : null}
                </div>
              </form>
            </section>

            <section className={styles.panel}>
              <div className={styles.tableActions}>
                <input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option>All</option><option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option>
                </select>
                <button onClick={exportOrders}>Export CSV</button>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr><th>Customer</th><th>Package</th><th>Platform</th><th>Payment</th><th>Price</th><th>Status</th><th>Access Key</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td><strong>{order.customer}</strong><small>{order.telegram}</small></td>
                        <td>{order.packageName}</td>
                        <td>{order.platform}</td>
                        <td>{order.paymentMethod}</td>
                        <td>{money(order.price)}</td>
                        <td>
                          <select value={order.status} onChange={(e) => setOrders((items) => items.map((o) => o.id === order.id ? { ...o, status: e.target.value as Status } : o))}>
                            <option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option>
                          </select>
                        </td>
                        <td><code>{order.accessKey}</code></td>
                        <td className={styles.rowActions}>
                          <button onClick={() => copyTelegram(order)}>Copy</button>
                          <button onClick={() => editOrder(order)}>Edit</button>
                          <button onClick={() => deleteOrder(order.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!filteredOrders.length ? <p className={styles.empty}>هیچ order نییە.</p> : null}
              </div>
            </section>
          </>
        )}

        {tab === "inbox" && (
          <section className={styles.panel}>
            <h2>inbox</h2>
            <div className={styles.inboxList}>
              {orders.filter((o) => o.status === "Pending").map((order) => (
                <button key={order.id} onClick={() => editOrder(order)}>
                  <strong>New order from {order.customer}</strong>
                  <span>{order.telegram} · {order.packageName} · {money(order.price)}</span>
                </button>
              ))}
              {!orders.filter((o) => o.status === "Pending").length ? <p className={styles.empty}>هیچ نامەی نوێ نییە.</p> : null}
            </div>
          </section>
        )}

        {(tab === "ios" || tab === "android" || tab === "cards" || tab === "icloud") && (
          <section className={styles.panel}>
            <h2>{navItems.find((n) => n.id === tab)?.label}</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Customer</th><th>Telegram</th><th>Package</th><th>Info</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {orders
                    .filter((o) =>
                      tab === "ios" ? o.platform === "iOS" :
                      tab === "android" ? o.platform === "Android" :
                      tab === "cards" ? o.platform === "Cards" :
                      o.platform === "iCloud"
                    )
                    .map((order) => (
                      <tr key={order.id}>
                        <td>{order.customer}</td>
                        <td>{order.telegram}</td>
                        <td>{order.packageName}</td>
                        <td>{order.udid || "-"}</td>
                        <td>{order.status}</td>
                        <td className={styles.rowActions}><button onClick={() => editOrder(order)}>Open</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "coupons" && (
          <section className={styles.panel}>
            <h2>subscription coupons</h2>
            <form className={styles.inlineForm} onSubmit={addCoupon}>
              <input placeholder="Coupon code" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
              <input placeholder="Discount" value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} />
              <button>Add new coupon</button>
            </form>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Code</th><th>Discount</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                      <td><code>{coupon.code}</code></td>
                      <td>{coupon.discount}</td>
                      <td>{coupon.status}</td>
                      <td className={styles.rowActions}>
                        <button onClick={() => setCoupons((items) => items.map((c) => c.id === coupon.id ? { ...c, status: c.status === "Active" ? "Disabled" : "Active" } : c))}>Toggle</button>
                        <button onClick={() => setCoupons((items) => items.filter((c) => c.id !== coupon.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "store" && (
          <section className={styles.panel}>
            <h2>store management</h2>
            <form className={styles.inlineFormWide} onSubmit={addApp}>
              <input placeholder="App name" value={newApp.name} onChange={(e) => setNewApp({ ...newApp, name: e.target.value })} />
              <input placeholder="Category" value={newApp.category} onChange={(e) => setNewApp({ ...newApp, category: e.target.value })} />
              <input placeholder="Version" value={newApp.version} onChange={(e) => setNewApp({ ...newApp, version: e.target.value })} />
              <select value={newApp.platform} onChange={(e) => setNewApp({ ...newApp, platform: e.target.value as "iOS" | "Android" })}>
                <option>iOS</option><option>Android</option>
              </select>
              <button>Add new item</button>
            </form>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Name</th><th>Category</th><th>Version</th><th>Platform</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {apps.map((app) => (
                    <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>{app.category}</td>
                      <td>{app.version}</td>
                      <td>{app.platform}</td>
                      <td>{app.status}</td>
                      <td className={styles.rowActions}>
                        <button onClick={() => setApps((items) => items.map((x) => x.id === app.id ? { ...x, status: x.status === "Available" ? "Hidden" : "Available" } : x))}>Toggle</button>
                        <button onClick={() => setApps((items) => items.filter((x) => x.id !== app.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "settings" && (
          <section className={styles.panel}>
            <h2>Settings</h2>
            <div className={styles.formGrid}>
              <input value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} />
              <input value={settings.telegram} onChange={(e) => setSettings({ ...settings, telegram: e.target.value })} />
              <input value={settings.license} onChange={(e) => setSettings({ ...settings, license: e.target.value })} />
              <input value={settings.version} onChange={(e) => setSettings({ ...settings, version: e.target.value })} />
            </div>
            <div className={styles.backupBox}>
              <button onClick={backupAll}>Database Copy / Backup JSON</button>
              <label>
                Restore JSON
                <input type="file" accept="application/json" onChange={(e) => restoreAll(e.target.files?.[0])} />
              </label>
            </div>
          </section>
        )}

        {(tab === "search" || tab === "plugins" || tab === "pages" || tab === "codes" || tab === "online" || tab === "about") && (
          <section className={styles.panel}>
            <h2>{navItems.find((n) => n.id === tab)?.label}</h2>
            <p className={styles.muted}>ئەم بەشە لە N1 Admin زیاد کراوە. دەتوانین دواتر function ـی تایبەتی تێدا زیاد بکەین.</p>
            <div className={styles.placeholderGrid}>
              <button onClick={() => setTab("orders")}>Manage orders</button>
              <button onClick={() => setTab("store")}>Store management</button>
              <button onClick={() => setTab("settings")}>Settings</button>
              <button onClick={backupAll}>Database copy</button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
