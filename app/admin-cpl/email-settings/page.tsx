import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="email settings"><GenericManager title="email settings" storageKey="n1_email_settings" addText="Add email item" /></AdminShell>;
}
