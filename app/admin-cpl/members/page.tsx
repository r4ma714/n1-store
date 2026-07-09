import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Store member management"><GenericManager title="Store member management" storageKey="n1_members" addText="Add member" /></AdminShell>;
}
