import AdminShell from "../_components/AdminShell";
import { SettingsClient } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Settings"><SettingsClient /></AdminShell>;
}
