import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new card"><GenericManager title="Add new card" storageKey="n1_cards" addText="Add card" /></AdminShell>;
}
