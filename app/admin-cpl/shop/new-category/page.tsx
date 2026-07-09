import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new section"><GenericManager title="Add new section" storageKey="n1_shop_categories" addText="Add section" /></AdminShell>;
}
