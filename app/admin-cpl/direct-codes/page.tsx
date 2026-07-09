import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="code management"><GenericManager title="code management" storageKey="n1_codes" addText="Add code" /></AdminShell>;
}
