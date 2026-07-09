import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="auto fix groups"><GenericManager title="auto fix groups" storageKey="n1_fix_groups" addText="Add fix task" /></AdminShell>;
}
