import AdminShell from "../../_components/AdminShell";
import { GenericManager } from "../../_components/Clients";

export default function Page() {
  return <AdminShell title="Find a coupon"><GenericManager title="Find a coupon" storageKey="n1_coupons" addText="Add coupon" /></AdminShell>;
}
