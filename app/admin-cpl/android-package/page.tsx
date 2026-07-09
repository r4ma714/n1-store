import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Android package"><GenericManager title="Android package" storageKey="n1_android_packages" addText="Add Android package" /></AdminShell>;
}
