import AdminShell from "../_components/AdminShell";
import { OnlineClient } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="online now"><OnlineClient /></AdminShell>;
}
