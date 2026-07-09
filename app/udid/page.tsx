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

const telegram = "https://t.me/the_moon_dev";

function makeToken() {
  return `n1-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function UdidPage() {
  const [token, setToken] = useState("");
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem("n1_udid_token") || "";
    } catch {}

    if (!saved) {
      saved = makeToken();
      try {
        localStorage.setItem("n1_udid_token", saved);
      } catch {}
    }

    setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;

    async function checkStatus() {
      try {
        const res = await fetch(`/api/udid/status?token=${encodeURIComponent(token)}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.device?.udid) {
          setDevice(data.device);
        }
      } catch {}
    }

    checkStatus();
    const timer = setInterval(checkStatus, 2500);
    return () => clearInterval(timer);
  }, [token]);

  const profileUrl = useMemo(() => {
    if (!token) return "/api/udid/profile";
    return `/api/udid/profile?token=${encodeURIComponent(token)}`;
  }, [token]);

  const telegramText = useMemo(() => {
    const udid = device?.udid || "";
    const product = device?.product || "";
    const version = device?.version || "";
    return `${telegram}?text=${encodeURIComponent(
      `Slaw, UDID ـەکەم بۆ N1 Store:\nUDID: ${udid}\nDevice: ${product || "-"}\niOS: ${version || "-"}`
    )}`;
  }, [device]);

  async function copyUdid() {
    if (!device?.udid) return;
    await navigator.clipboard.writeText(device.udid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function resetToken() {
    const next = makeToken();
    try {
      localStorage.setItem("n1_udid_token", next);
    } catch {}
    setDevice(null);
    setToken(next);
  }

  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <a className={styles.brand} href="/">
          <img src="/n1-logo.png" alt="N1 Store" />
          <div>
            <strong>N1 Store</strong>
            <span>UDID Extract</span>
          </div>
        </a>

        <div className={styles.navLinks}>
          <a href="/">Home</a>
          <a href={telegram} target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.card}>
          <div className={styles.logoBox}>
            <img src="/n1-logo.png" alt="N1 Store" />
          </div>

          <h1>Extract Your Device UDID</h1>
          <p>Get your device UDID with simple and quick steps</p>

          <a className={styles.installBtn} href={profileUrl}>
            Install Profile
          </a>

          <div className={styles.steps}>
            <div>
              <b>1</b>
              <span>Click on Install Profile button</span>
            </div>
            <div>
              <b>2</b>
              <span>Install the profile in your device settings</span>
            </div>
            <div>
              <b>3</b>
              <span>Your UDID will be displayed here</span>
            </div>
          </div>
        </div>

        <div className={styles.resultCard}>
          <span className={device?.udid ? styles.statusOk : styles.statusWait}>
            {device?.udid ? "UDID Received" : "Waiting for UDID"}
          </span>

          <h2>{device?.udid ? "Your UDID" : "After install, come back here"}</h2>

          {device?.udid ? (
            <>
              <div className={styles.udidBox}>{device.udid}</div>

              <div className={styles.deviceGrid}>
                <div><small>Device</small><strong>{device.product || "iPhone"}</strong></div>
                <div><small>iOS</small><strong>{device.version || "iOS"}</strong></div>
                <div><small>Name</small><strong>{device.deviceName || "-"}</strong></div>
                <div><small>Serial</small><strong>{device.serial || "-"}</strong></div>
              </div>

              <div className={styles.actions}>
                <button onClick={copyUdid}>{copied ? "Copied ✓" : "Copy UDID"}</button>
                <a href={telegramText} target="_blank" rel="noreferrer">Send to Telegram</a>
              </div>
            </>
          ) : (
            <>
              <p className={styles.helpText}>
                لە iPhone بە Safari بکەرەوە. دوای کلیک لە Install Profile، بچۆ:
                <br />
                <b>Settings → Profile Downloaded → Install</b>
              </p>

              <div className={styles.note}>
                بۆ کارکردنی ڕاستەقینە پێویستە website ـەکە HTTPS بێت، وەک Vercel یان domain.
                لە localhost/IP هەندێ جار iPhone profile install ناکات.
              </div>

              <button className={styles.secondaryBtn} onClick={resetToken}>
                Generate New Session
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
