import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Add new coupon"><GenericManager title="Add new coupon" storageKey="n1_coupons" addText="Add coupon" /></AdminShell>;
}
