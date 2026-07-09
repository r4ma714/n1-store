import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Android Manage applications"><GenericManager title="Android Manage applications" storageKey="n1_android_apps" addText="Add Android app" /></AdminShell>;
}
