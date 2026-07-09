import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="general settings"><GenericManager title="general settings" storageKey="n1_general_settings" addText="Add setting" /></AdminShell>;
}
