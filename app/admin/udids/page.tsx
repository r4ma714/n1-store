export default function AdminUdidsPage() {
  return (
    <main className="rulesPage">
      <div className="sectionHeader">
        <p>Admin</p>
        <h2>UDID Management</h2>
        <span className="subText">UDID ـەکان لە Admin Panel ـی سەرەکی لە خانەی order تۆمار بکە.</span>
      </div>
      <div className="contact">
        <h2>بچۆ Admin Panel</h2>
        <p>لەوێ order، UDID، payment و status هەمووی بەدەست دەکەیت.</p>
        <a className="btnPrimary" href="/admin">Open Admin Panel</a>
      </div>
    </main>
  );
}
