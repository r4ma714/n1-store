import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="additional pages"><GenericManager title="additional pages" storageKey="n1_additional_pages" addText="Add page" /></AdminShell>;
}
