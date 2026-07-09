import AdminShell from "../_components/AdminShell";
import { GenericManager } from "../_components/Clients";

export default function Page() {
  return <AdminShell title="Telegram notifications"><GenericManager title="Telegram notifications" storageKey="n1_telegram_notifications" addText="Add notification" /></AdminShell>;
}
