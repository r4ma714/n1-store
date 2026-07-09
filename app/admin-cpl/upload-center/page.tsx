import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="upload center management"><GenericManager title="upload center management" storageKey="n1_uploads" addText="Add upload" /></AdminShell>;
}
