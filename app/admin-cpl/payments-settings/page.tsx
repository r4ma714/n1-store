import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Payment settings"><GenericManager title="Payment settings" storageKey="n1_payment_settings" addText="Add payment method" /></AdminShell>;
}
