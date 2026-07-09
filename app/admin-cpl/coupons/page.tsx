import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="coupon management"><GenericManager title="coupon management" storageKey="n1_coupons" addText="Add coupon" /></AdminShell>;
}
