import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="manage static pages"><GenericManager title="manage static pages" storageKey="n1_pages" addText="Add page" /></AdminShell>;
}
