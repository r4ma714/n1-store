import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="card management"><GenericManager title="card management" storageKey="n1_cards" addText="Add card" /></AdminShell>;
}
