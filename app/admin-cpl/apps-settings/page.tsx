import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Application settings"><GenericManager title="Application settings" storageKey="n1_app_settings" addText="Add app setting" /></AdminShell>;
}
