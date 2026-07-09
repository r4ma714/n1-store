import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="discount coupons"><GenericManager title="discount coupons" storageKey="n1_discount_coupons" addText="Add discount coupon" /></AdminShell>;
}
