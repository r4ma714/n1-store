import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new item"><GenericManager title="Add new item" storageKey="n1_shop" addText="Add product" /></AdminShell>;
}
