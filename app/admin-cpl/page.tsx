import AdminShell from "./_components/AdminShell";
import { DashboardClient } from "./_components/Clients";

export default function Page() {
  return <AdminShell title="dashboard"><DashboardClient /></AdminShell>;
}
