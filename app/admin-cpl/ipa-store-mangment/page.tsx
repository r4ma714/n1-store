import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="application notifications"><GenericManager title="application notifications" storageKey="n1_app_notifications" addText="Add notification" /></AdminShell>;
}
