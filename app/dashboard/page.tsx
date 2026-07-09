"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./CustomerDashboard.module.css";

type Order = {
  id: string;
  customer: string;
  telegram: string;
  packageName: string;
  platform: string;
  udid: string;
  paymentMethod: string;
  price: number;
  status: string;
  accessKey: string;
  notes: string;
  createdAt: string;
  expiresAt: string;
};

function money(value: number) {
  return `${Number(value || 0).toLocaleString()} IQD`;
}

export default function CustomerDashboard() {
  const [key, setKey] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [current, setCurrent] = useState<Order | null>(null);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("n1_orders") || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  function login(e: FormEvent) {
    e.preventDefault();
    const found = orders.find((o) => o.accessKey.toLowerCase() === key.trim().toLowerCase());
    if (found) setCurrent(found);
    else alert("Access key نەدۆزرایەوە. جارێ ئەمە لە هەمان browser ـی admin کار دەکات.");
  }

  if (!current) {
    return (
      <main className={styles.page}>
        <form className={styles.card} onSubmit={login}>
          <div className={styles.logo}>N1</div>
          <h1>Customer Dashboard</h1>
          <p>Access Key ـی کڕیار بنووسە بۆ بینینی package status.</p>
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="N1-KEY-..." />
          <button>Open Dashboard</button>
          <a href="https://t.me/the_moon_dev" target="_blank">Need help? Telegram</a>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <p>Welcome back</p>
            <h1>{current.customer}</h1>
          </div>
          <a href="https://t.me/the_moon_dev" target="_blank">Telegram Support</a>
        </div>

        <div className={styles.grid}>
          <div><p>Package</p><h2>{current.packageName}</h2></div>
          <div><p>Status</p><h2>{current.status}</h2></div>
          <div><p>Platform</p><h2>{current.platform}</h2></div>
          <div><p>Price</p><h2>{money(current.price)}</h2></div>
        </div>

        <div className={styles.panel}>
          <h2>Device Info</h2>
          <p><b>Telegram:</b> {current.telegram}</p>
          <p><b>UDID:</b> {current.udid || "Not added yet"}</p>
          <p><b>Payment:</b> {current.paymentMethod}</p>
          <p><b>Created:</b> {current.createdAt}</p>
          <p><b>Expires:</b> {current.expiresAt}</p>
          <p><b>Access Key:</b> {current.accessKey}</p>
        </div>

        <div className={styles.panel}>
          <h2>App Library Preview</h2>
          <div className={styles.apps}>
            <span>Instagram++</span>
            <span>TikTok Premium</span>
            <span>Spotify Premium</span>
            <span>ESign / GBox</span>
          </div>
        </div>
      </section>
    </main>
  );
}
