import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new card group"><GenericManager title="Add new card group" storageKey="n1_card_groups" addText="Add card group" /></AdminShell>;
}
