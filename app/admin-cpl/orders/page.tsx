import AdminShell from "../_components/AdminShell";
import { OrdersClient } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="manage orders"><OrdersClient /></AdminShell>;
}
