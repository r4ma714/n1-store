import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="manage slideshow"><GenericManager title="manage slideshow" storageKey="n1_slides" addText="Add slide" /></AdminShell>;
}
