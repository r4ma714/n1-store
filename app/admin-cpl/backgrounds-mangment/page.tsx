import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="manage backgrounds"><GenericManager title="manage backgrounds" storageKey="n1_backgrounds" addText="Add background" /></AdminShell>;
}
