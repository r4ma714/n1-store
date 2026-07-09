import styles from "./AdminUdids.module.css";

export default function AdminUdidsPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <a href="/admin">Admin</a>
        <a href="/udid">UDID Page</a>
        <a href="/">Website</a>
      </nav>

      <section className={styles.card}>
        <span>Preview</span>
        <h1>N1 UDID Orders</h1>
        <p>
          ئەم بەشە بۆ پێشبینینی Admin ـە. ئێستا UDID لە پەڕەی /udid وەردەگیرێت و کڕیار دەتوانێت ڕاستەوخۆ بۆ Telegram بینێرێت.
          بۆ ئەوەی order ـەکان هەمیشە لە panel بمێننەوە، دواتر database زیاد دەکەین.
        </p>
      </section>
    </main>
  );
}
