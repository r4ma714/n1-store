import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="IOS Manage Groups"><GenericManager title="IOS Manage Groups" storageKey="n1_ios_groups" addText="Add iOS group" /></AdminShell>;
}
