"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AdminCpl.module.css";

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

type Item = {
  id: string;
  name: string;
  value: string;
  category: string;
  status: "Active" | "Disabled" | "Available" | "Hidden";
  createdAt: string;
};

const prices: Record<PackageName, number> = { Basic: 20000, Gold: 25000, VIP: 50000 };

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nextYear() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

function money(value: number) {
  return `${Number(value || 0).toLocaleString()} IQD`;
}

function downloadText(name: string, text: string, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function csv(name: string, rows: string[][]) {
  downloadText(name, rows.map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(",")).join("\n"), "text/csv;charset=utf-8");
}

export function useBackup() {
  useEffect(() => {
    function backup() {
      const data = {
        orders: read("n1_orders", []),
        apps: read("n1_apps", []),
        coupons: read("n1_coupons", []),
        cards: read("n1_cards", []),
        codes: read("n1_codes", []),
        pages: read("n1_pages", []),
        settings: read("n1_settings", {}),
      };
      downloadText("n1-admin-backup.json", JSON.stringify(data, null, 2), "application/json");
    }
    window.addEventListener("n1-backup", backup);
    return () => window.removeEventListener("n1-backup", backup);
  }, []);
}

export function DashboardClient() {
  useBackup();
  const [orders, setOrders] = useState<Order[]>([]);
  const [apps, setApps] = useState<Item[]>([]);
  const [coupons, setCoupons] = useState<Item[]>([]);

  useEffect(() => {
    setOrders(read("n1_orders", []));
    setApps(read("n1_apps", []));
    setCoupons(read("n1_coupons", []));
  }, []);

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "Pending");
    return {
      total: orders.length,
      pending: pending.length,
      ios: pending.filter((o) => o.platform === "iOS").length,
      android: pending.filter((o) => o.platform === "Android").length,
      cards: pending.filter((o) => o.platform === "Cards").length,
      shop: pending.filter((o) => o.platform === "Shop").length,
      icloud: pending.filter((o) => o.platform === "iCloud").length,
      visitors: 56506,
      online: 8,
      apps: apps.length || 9792,
      signed: orders.filter((o) => o.status === "Active").length || 92,
      revenue: orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + Number(o.price || 0) : sum, 0),
      coupons: coupons.length,
    };
  }, [orders, apps, coupons]);

  return (
    <>
      <section className={styles.grid3}>
        <div className={styles.panel}><h3>support channels</h3><div className={styles.grid2}><a className={styles.secondaryBtn} href="https://t.me/the_moon_dev" target="_blank">Support</a><a className={styles.secondaryBtn} href="https://t.me/the_moon_dev" target="_blank">iOS Support</a><a className={styles.secondaryBtn} href="https://t.me/the_moon_dev" target="_blank">Android Support</a><a className={styles.secondaryBtn} href="https://t.me/the_moon_dev" target="_blank">Apps Updates</a></div></div>
        <div className={styles.serverCard}><h3>server size</h3><p>user: 4.45 TB</p><div className={styles.progress}><i style={{ width: "28%" }} /></div><p>Available: 11.18 TB</p><div className={styles.progress}><i style={{ width: "72%" }} /></div><h3>storage 15.62 TB</h3></div>
        <div className={styles.panel}><h3>License Type</h3><p className={styles.muted}>permanent license</p><h3>{money(stats.revenue)}</h3><p className={styles.muted}>estimated revenue</p></div>
      </section>

      <section className={styles.boostat}>
        <div className={styles.boostatIcon}>★</div>
        <div><h2>Ready-to-sell digital services in your store</h2><p className={styles.muted}>Digital services, cards, codes, packages and Telegram fulfillment for N1 Store.</p></div>
        <a className={styles.primaryBtn} href="/admin-cpl/shop">Enable Now</a>
      </section>

      <section className={styles.alert}><strong>Alert!</strong> Current release version is PRO EDITION Plus v8.9.8</section>

      <section className={styles.quickOrders}>
        <div className={styles.quickHead}><h3>Quick Orders Alerts</h3><span>{stats.pending} pending orders</span></div>
        <div className={styles.quickGrid}>
          <a href="/admin-cpl/orders">🍎<strong>iOS Orders</strong><em>{stats.ios}</em></a>
          <a href="/admin-cpl/orders">🤖<strong>Android Orders</strong><em>{stats.android}</em></a>
          <a href="/admin-cpl/cards">💳<strong>Cards Orders</strong><em>{stats.cards}</em></a>
          <a href="/admin-cpl/shop">🛒<strong>Shop Orders</strong><em>{stats.shop}</em></a>
          <a href="/admin-cpl/icloud-unlock-services">☁️<strong>iCloud Unlock</strong><em>{stats.icloud}</em></a>
        </div>
      </section>

      <section className={styles.grid4}>
        <div className={styles.statBox}><p>Total orders</p><strong>{stats.total}</strong></div>
        <div className={styles.statBox}><p>number of visitors</p><strong>{stats.visitors.toLocaleString()}</strong></div>
        <div className={styles.statBox}><p>who's online now</p><strong>{stats.online}</strong></div>
        <div className={styles.statBox}><p>applications</p><strong>{stats.apps.toLocaleString()}</strong></div>
        <div className={styles.statBox}><p>signed applications</p><strong>{stats.signed}</strong></div>
        <div className={styles.statBox}><p>coupons</p><strong>{stats.coupons}</strong></div>
        <div className={styles.statBox}><p>total of all members</p><strong>1149</strong></div>
        <div className={styles.statBox}><p>number of all groups</p><strong>0</strong></div>
      </section>
    </>
  );
}

export function OrdersClient({ onlyPlatform }: { onlyPlatform?: Platform }) {
  useBackup();
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    customer: "", telegram: "", phone: "", packageName: "Gold" as PackageName, platform: (onlyPlatform || "iOS") as Platform,
    udid: "", paymentMethod: "FastPay" as PaymentMethod, price: 25000, status: "Pending" as Status, notes: "", expiresAt: "",
  });

  useEffect(() => setOrders(read("n1_orders", [])), []);
  useEffect(() => write("n1_orders", orders), [orders]);

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    const next = { ...form, [key]: value };
    if (key === "packageName") next.price = prices[value as PackageName];
    setForm(next);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customer.trim() || !form.telegram.trim()) return alert("Customer و Telegram پێویستە");
    if (editing) {
      setOrders((items) => items.map((o) => o.id === editing ? { ...o, ...form } : o));
      setEditing(null);
    } else {
      setOrders((items) => [{ ...form, id: makeId("ORD"), accessKey: makeId("N1-KEY"), createdAt: today(), expiresAt: form.expiresAt || nextYear() }, ...items]);
    }
    setForm({ customer: "", telegram: "", phone: "", packageName: "Gold", platform: onlyPlatform || "iOS", udid: "", paymentMethod: "FastPay", price: 25000, status: "Pending", notes: "", expiresAt: "" });
  }

  function edit(o: Order) {
    setEditing(o.id);
    setForm({ customer: o.customer, telegram: o.telegram, phone: o.phone, packageName: o.packageName, platform: o.platform, udid: o.udid, paymentMethod: o.paymentMethod, price: o.price, status: o.status, notes: o.notes, expiresAt: o.expiresAt });
    scrollTo({ top: 0, behavior: "smooth" });
  }

  function copy(o: Order) {
    navigator.clipboard.writeText(`N1 Order\nCustomer: ${o.customer}\nTelegram: ${o.telegram}\nPackage: ${o.packageName}\nPlatform: ${o.platform}\nUDID/Info: ${o.udid || "-"}\nPayment: ${o.paymentMethod}\nPrice: ${money(o.price)}\nStatus: ${o.status}\nAccess Key: ${o.accessKey}`);
    alert("Copied");
  }

  function exportOrders() {
    csv("n1-orders.csv", [["ID","Customer","Telegram","Phone","Package","Platform","Info","Payment","Price","Status","AccessKey"], ...orders.map(o => [o.id,o.customer,o.telegram,o.phone,o.packageName,o.platform,o.udid,o.paymentMethod,String(o.price),o.status,o.accessKey])]);
  }

  const filtered = orders.filter((o) => {
    const platformOk = !onlyPlatform || o.platform === onlyPlatform;
    const filterOk = filter === "All" || o.status === filter;
    const searchOk = `${o.customer} ${o.telegram} ${o.udid} ${o.accessKey}`.toLowerCase().includes(q.toLowerCase());
    return platformOk && filterOk && searchOk;
  });

  return (
    <>
      <section className={styles.panel}>
        <h2>{editing ? "Edit Order" : "Add New Order"}</h2>
        <form className={styles.formGrid} onSubmit={submit}>
          <input className={styles.field} placeholder="Customer name" value={form.customer} onChange={(e) => setField("customer", e.target.value)} />
          <input className={styles.field} placeholder="Telegram username" value={form.telegram} onChange={(e) => setField("telegram", e.target.value)} />
          <input className={styles.field} placeholder="Phone number" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
          <select className={styles.select} value={form.packageName} onChange={(e) => setField("packageName", e.target.value as PackageName)}><option>Basic</option><option>Gold</option><option>VIP</option></select>
          <select className={styles.select} value={form.platform} onChange={(e) => setField("platform", e.target.value as Platform)}><option>iOS</option><option>Android</option><option>Cards</option><option>Shop</option><option>iCloud</option></select>
          <select className={styles.select} value={form.paymentMethod} onChange={(e) => setField("paymentMethod", e.target.value as PaymentMethod)}><option>FastPay</option><option>ZainCash</option><option>FIB</option><option>Areeba</option><option>Cash</option></select>
          <input className={styles.field} placeholder="UDID / code / card info" value={form.udid} onChange={(e) => setField("udid", e.target.value)} />
          <input className={styles.field} type="number" value={form.price} onChange={(e) => setField("price", Number(e.target.value))} />
          <select className={styles.select} value={form.status} onChange={(e) => setField("status", e.target.value as Status)}><option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option></select>
          <input className={styles.field} type="date" value={form.expiresAt} onChange={(e) => setField("expiresAt", e.target.value)} />
          <textarea className={`${styles.textarea} ${styles.wide}`} placeholder="Notes" value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
          <div className={`${styles.formActions} ${styles.wide}`}><button className={styles.primaryBtn}>{editing ? "Save Changes" : "Add Order"}</button>{editing && <button type="button" className={styles.secondaryBtn} onClick={() => setEditing(null)}>Cancel</button>}</div>
        </form>
      </section>

      <section className={styles.panel}>
        <div className={styles.formActions}>
          <input className={styles.field} placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className={styles.select} value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option></select>
          <button className={styles.primaryBtn} onClick={exportOrders}>Export CSV</button>
        </div>
        <div className={styles.tableWrap}>
          <table><thead><tr><th>Customer</th><th>Package</th><th>Platform</th><th>Payment</th><th>Price</th><th>Status</th><th>Access Key</th><th>Actions</th></tr></thead>
            <tbody>{filtered.map((o) => <tr key={o.id}><td><strong>{o.customer}</strong><small>{o.telegram}</small></td><td>{o.packageName}</td><td>{o.platform}</td><td>{o.paymentMethod}</td><td>{money(o.price)}</td><td><select value={o.status} onChange={(e) => setOrders(items => items.map(x => x.id === o.id ? { ...x, status: e.target.value as Status } : x))}><option>Pending</option><option>Paid</option><option>Active</option><option>Done</option><option>Cancelled</option></select></td><td><code>{o.accessKey}</code></td><td className={styles.rowActions}><button className={styles.smallBtn} onClick={() => copy(o)}>Copy</button><button className={styles.smallBtn} onClick={() => edit(o)}>Edit</button><button className={styles.dangerBtn} onClick={() => setOrders(items => items.filter(x => x.id !== o.id))}>Delete</button></td></tr>)}</tbody>
          </table>
          {!filtered.length && <p className={styles.empty}>هیچ داتایەک نییە.</p>}
        </div>
      </section>
    </>
  );
}

export function InboxClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => setOrders(read("n1_orders", [])), []);
  const pending = orders.filter((o) => o.status === "Pending");
  return <section className={styles.panel}><h2>Inbox</h2><div className={styles.list}>{pending.map(o => <a href="/admin-cpl/orders" key={o.id}><strong>New order from {o.customer}</strong><span>{o.telegram} · {o.packageName} · {money(o.price)}</span></a>)}{!pending.length && <p className={styles.empty}>هیچ pending order نییە.</p>}</div></section>;
}

export function SearchClient({ query }: { query?: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [apps, setApps] = useState<Item[]>([]);
  const [q, setQ] = useState(query || "");
  useEffect(() => { setOrders(read("n1_orders", [])); setApps(read("n1_apps", [])); }, []);
  const orderResults = orders.filter(o => `${o.customer} ${o.telegram} ${o.udid} ${o.accessKey}`.toLowerCase().includes(q.toLowerCase()));
  const appResults = apps.filter(a => `${a.name} ${a.category} ${a.value}`.toLowerCase().includes(q.toLowerCase()));
  return <section className={styles.panel}><h2>Search Management</h2><input className={styles.field} placeholder="Search user, order, app, code..." value={q} onChange={(e) => setQ(e.target.value)} /><div className={styles.grid2} style={{marginTop: 14}}><div className={styles.cardMini}><h3>Orders</h3><div className={styles.list}>{orderResults.map(o => <a href="/admin-cpl/orders" key={o.id}><strong>{o.customer}</strong><span>{o.telegram} · {o.status}</span></a>)}</div></div><div className={styles.cardMini}><h3>Apps / Items</h3><div className={styles.list}>{appResults.map(a => <span key={a.id}><strong>{a.name}</strong><span>{a.category}</span></span>)}</div></div></div></section>;
}

export function GenericManager({ title, storageKey, addText = "Add item" }: { title: string; storageKey: string; addText?: string }) {
  useBackup();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: "", value: "", category: "General" });

  useEffect(() => setItems(read(storageKey, [])), [storageKey]);
  useEffect(() => write(storageKey, items), [items, storageKey]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setItems([{ ...form, id: makeId("ITEM"), status: "Active", createdAt: today() }, ...items]);
    setForm({ name: "", value: "", category: "General" });
  }

  return (
    <section className={styles.panel}>
      <h2>{title}</h2>
      <form className={styles.formGrid} onSubmit={submit}>
        <input className={styles.field} placeholder="Name / title" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={styles.field} placeholder="Value / code / link" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <input className={styles.field} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <div className={`${styles.formActions} ${styles.wide}`}><button className={styles.primaryBtn}>{addText}</button><button type="button" className={styles.secondaryBtn} onClick={() => csv(`${storageKey}.csv`, [["ID","Name","Value","Category","Status","Created"], ...items.map(i => [i.id,i.name,i.value,i.category,i.status,i.createdAt])])}>Export CSV</button></div>
      </form>
      <div className={styles.tableWrap} style={{marginTop: 16}}>
        <table><thead><tr><th>Name</th><th>Value</th><th>Category</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>{items.map(item => <tr key={item.id}><td>{item.name}</td><td>{item.value || "-"}</td><td>{item.category}</td><td>{item.status}</td><td>{item.createdAt}</td><td className={styles.rowActions}><button className={styles.smallBtn} onClick={() => setItems(items.map(x => x.id === item.id ? { ...x, status: x.status === "Active" || x.status === "Available" ? "Disabled" : "Active" } : x))}>Toggle</button><button className={styles.dangerBtn} onClick={() => setItems(items.filter(x => x.id !== item.id))}>Delete</button></td></tr>)}</tbody>
        </table>
        {!items.length && <p className={styles.empty}>هیچ item نییە.</p>}
      </div>
    </section>
  );
}

export function OnlineClient() {
  return <section className={styles.panel}><h2>Online Now</h2><div className={styles.grid4}>{["iPhone 15 Pro", "iPhone 14", "Chrome Windows", "Safari iOS", "Telegram User", "Admin", "Customer", "Guest"].map((name, i) => <div className={styles.statBox} key={name}><p>{name}</p><strong>{i + 1}</strong><span className={styles.muted}>online session</span></div>)}</div></section>;
}

export function SettingsClient() {
  useBackup();
  const [settings, setSettings] = useState({ storeName: "N1 Store", telegram: "@the_moon_dev", fastpay: "", zaincash: "", fib: "", areeba: "", version: "PRO EDITION Plus v8.9.8" });
  useEffect(() => setSettings(read("n1_settings", settings)), []);
  useEffect(() => write("n1_settings", settings), [settings]);

  function restore(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || "{}"));
        if (data.orders) write("n1_orders", data.orders);
        if (data.apps) write("n1_apps", data.apps);
        if (data.coupons) write("n1_coupons", data.coupons);
        if (data.cards) write("n1_cards", data.cards);
        if (data.codes) write("n1_codes", data.codes);
        if (data.settings) setSettings(data.settings);
        alert("Restore تەواو بوو");
      } catch {
        alert("Backup file هەڵەیە");
      }
    };
    reader.readAsText(file);
  }

  return <section className={styles.panel}><h2>Settings</h2><div className={styles.formGrid}>{Object.entries(settings).map(([key, value]) => <input key={key} className={styles.field} placeholder={key} value={value} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />)}<div className={`${styles.formActions} ${styles.wide}`}><button className={styles.primaryBtn} onClick={() => alert("Settings saved")}>Save Settings</button><button className={styles.secondaryBtn} onClick={() => window.dispatchEvent(new Event("n1-backup"))}>Backup JSON</button><label className={styles.secondaryBtn}>Restore JSON<input className={styles.backupInput} type="file" accept="application/json" onChange={(e) => restore(e.target.files?.[0])} /></label></div></div></section>;
}
