import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="admin site news"><GenericManager title="admin site news" storageKey="n1_news" addText="Add news" /></AdminShell>;
}
