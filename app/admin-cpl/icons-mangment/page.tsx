import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="manage icons"><GenericManager title="manage icons" storageKey="n1_icons" addText="Add icon" /></AdminShell>;
}
