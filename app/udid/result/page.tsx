import styles from "../UdidPage.module.css";

export default async function UdidResultPage({
  searchParams,
}: {
  searchParams?: Promise<{ udid?: string; product?: string; version?: string }>;
}) {
  const params = (await searchParams) || {};
  const udid = params.udid || "";

  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <a className={styles.brand} href="/">
          <img src="/n1-logo.png" alt="N1 Store" />
          <div>
            <strong>N1 Store</strong>
            <span>UDID Result</span>
          </div>
        </a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.resultCard}>
          <span className={udid ? styles.statusOk : styles.statusWait}>
            {udid ? "UDID Received" : "No UDID Found"}
          </span>
          <h2>Your UDID</h2>
          <div className={styles.udidBox}>{udid || "UDID not found yet"}</div>
          <div className={styles.actions}>
            <a href="/udid">Back to UDID page</a>
            <a href={`https://t.me/the_moon_dev?text=${encodeURIComponent(`UDID: ${udid}`)}`} target="_blank" rel="noreferrer">Send to Telegram</a>
          </div>
        </div>
      </section>
    </main>
  );
}
