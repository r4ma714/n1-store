import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="IOS Manage applications"><GenericManager title="IOS Manage applications" storageKey="n1_apps" addText="Add iOS app" /></AdminShell>;
}
