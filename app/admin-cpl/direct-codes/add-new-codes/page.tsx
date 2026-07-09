import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new codes"><GenericManager title="Add new codes" storageKey="n1_codes" addText="Add code" /></AdminShell>;
}
