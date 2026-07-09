import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Dylib management"><GenericManager title="Dylib management" storageKey="n1_dylibs" addText="Add dylib" /></AdminShell>;
}
