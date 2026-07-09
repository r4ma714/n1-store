import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="store management"><GenericManager title="store management" storageKey="n1_shop" addText="Add product" /></AdminShell>;
}
