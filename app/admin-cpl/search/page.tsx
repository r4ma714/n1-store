import AdminShell from "../_components/AdminShell";
import { SearchClient } from "../_components/Clients";

export default function Page({ searchParams }: { searchParams?: { q?: string } }) {
  return <AdminShell title="search management"><SearchClient query={searchParams?.q || ""} /></AdminShell>;
}
