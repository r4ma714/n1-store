"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./UdidPage.module.css";

type DeviceInfo = {
  udid?: string;
  product?: string;
  version?: string;
  deviceName?: string;
  serial?: string;
  imei?: string;
  createdAt?: string;
};

const telegramUser = "the_moon_dev";

function makeToken() {
  const random = Math.random().toString(36).slice(2);
  return `n1-${Date.now()}-${random}`;
}

export default function UdidPage() {
  const [token, setToken] = useState("");
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [manualUdid, setManualUdid] = useState("");
  const [copied, setCopied] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("n1_udid_token") || makeToken();
    localStorage.setItem("n1_udid_token", saved);
    setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/udid/status?token=${encodeURIComponent(token)}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.device?.udid) {
          setDevice(data.device);
          setManualUdid(data.device.udid);
        }
      } catch {
        // keep page quiet for customers
      }
    };

    load();
    const timer = window.setInterval(load, 2500);
    return () => window.clearInterval(timer);
  }, [token]);

  const installLink = useMemo(() => {
    if (!token) return "#";
    return `/api/udid/profile?token=${encodeURIComponent(token)}`;
  }, [token]);

  const finalUdid = manualUdid || device?.udid || "";
  const orderMessage = `Slaw, damawet N1 Store package bikrim.%0A%0AUDID: ${encodeURIComponent(finalUdid || "-")}%0ADevice: ${encodeURIComponent(device?.product || "-")}%0AiOS: ${encodeURIComponent(device?.version || "-")}%0ATelegram: @${telegramUser}`;

  async function copyUdid() {
    if (!finalUdid) return;
    await navigator.clipboard.writeText(finalUdid);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyOrderAndOpenTelegram() {
    const text = `Slaw, damawet N1 Store package bikrim.\n\nUDID: ${finalUdid || "-"}\nDevice: ${device?.product || "-"}\niOS: ${device?.version || "-"}\nTelegram: @${telegramUser}`;
    await navigator.clipboard.writeText(text);
    setOrderCopied(true);
    window.setTimeout(() => setOrderCopied(false), 1800);
    window.open(`https://t.me/${telegramUser}?text=${orderMessage}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <a className={styles.brand} href="/">
          <img src="/n1-logo.png" alt="N1 Store" />
          <span>
            <strong>N1 Store</strong>
            <small>UDID Registration</small>
          </span>
        </a>
        <div className={styles.links}>
          <a href="/">Website</a>
          <a href={`https://t.me/${telegramUser}`} target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.badge}>iPhone / iPad UDID</span>
          <h1>Extract Your Device UDID</h1>
          <p>
            بۆ تۆمارکردنی iPhone لە N1 Store، Profile دابمەزرێنە و UDID ـەکەت بە خێرایی وەربگرە.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href={installLink}>Install Profile</a>
            <a className={styles.secondaryButton} href="#manual">Manual Paste</a>
          </div>
          <p className={styles.note}>
            باشترینە لە iPhone/iPad بە Safari بکرێتەوە. بۆ production پێویستە website ـەکەت HTTPS بێت.
          </p>
        </div>

        <div className={styles.phoneCard}>
          <div className={styles.phoneSpeaker} />
          <img className={styles.bigIcon} src="/n1-logo.png" alt="N1" />
          <h2>N1 UDID</h2>
          <p>{device?.udid ? "UDID وەرگیرا ✅" : "چاوەڕێی install کردنی profile..."}</p>
          <div className={styles.stepsMini}>
            <span>Profile</span>
            <span>Settings</span>
            <span>UDID</span>
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.sectionHeader}>
          <span>Steps</span>
          <h2>چۆن UDID وەردەگریت؟</h2>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <strong>1</strong>
            <h3>Install Profile</h3>
            <p>دوگمەی Install Profile دابگرە لە iPhone/iPad.</p>
          </div>
          <div className={styles.stepCard}>
            <strong>2</strong>
            <h3>Go to Settings</h3>
            <p>بچۆ Settings → Profile Downloaded → Install.</p>
          </div>
          <div className={styles.stepCard}>
            <strong>3</strong>
            <h3>Copy UDID</h3>
            <p>UDID ـەکەت لەم پەڕەیە دەردەکەوێت، دواتر copy بکە.</p>
          </div>
        </div>
      </section>

      <section id="manual" className={styles.resultSection}>
        <div className={styles.resultCard}>
          <div className={styles.sectionHeaderSmall}>
            <span>Result</span>
            <h2>UDID ـی تۆ</h2>
          </div>

          <label className={styles.label}>UDID</label>
          <textarea
            value={manualUdid}
            onChange={(e) => setManualUdid(e.target.value.trim())}
            placeholder="UDID ـەکەت لێرە دەردەکەوێت یان خۆت paste ـی بکە"
            className={styles.udidBox}
          />

          <div className={styles.infoGrid}>
            <div>
              <span>Device</span>
              <strong>{device?.product || "-"}</strong>
            </div>
            <div>
              <span>iOS</span>
              <strong>{device?.version || "-"}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{finalUdid ? "Ready" : "Waiting"}</strong>
            </div>
          </div>

          <div className={styles.actionsWide}>
            <button className={styles.secondaryButton} onClick={copyUdid} disabled={!finalUdid}>
              {copied ? "Copied ✅" : "Copy UDID"}
            </button>
            <button className={styles.primaryButton} onClick={copyOrderAndOpenTelegram} disabled={!finalUdid}>
              {orderCopied ? "Order Copied ✅" : "Send to Telegram"}
            </button>
          </div>
        </div>

        <div className={styles.privacyCard}>
          <h3>Privacy</h3>
          <p>
            ئەم profile ـە تەنها بۆ وەرگرتنی UDID و زانیارییە بنەڕەتییەکانی ئامێرەکەتە. دوای وەرگرتنی UDID دەتوانیت profile ـەکە بسڕیتەوە.
          </p>
          <ol>
            <li>Settings بکەرەوە</li>
            <li>General → VPN & Device Management</li>
            <li>N1 Store UDID Profile بسڕەوە</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
