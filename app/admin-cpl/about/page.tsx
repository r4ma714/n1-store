import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="About App"><GenericManager title="About App" storageKey="n1_about" addText="Add note" /></AdminShell>;
}
