import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Paid application package"><GenericManager title="Paid application package" storageKey="n1_paid_packages" addText="Add package" /></AdminShell>;
}
