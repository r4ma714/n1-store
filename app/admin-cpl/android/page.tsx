import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Android Manage Groups"><GenericManager title="Android Manage Groups" storageKey="n1_android_groups" addText="Add Android group" /></AdminShell>;
}
