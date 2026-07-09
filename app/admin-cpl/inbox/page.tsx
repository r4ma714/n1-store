import AdminShell from "../_components/AdminShell";
import { InboxClient } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="inbox"><InboxClient /></AdminShell>;
}
