import { EntryForm } from "@/components/entry-form";
import LastMovements from "@/components/last-movements";
import Header from "@/components/header";
import BalanceCard from "@/components/balance-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Main Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Balance Card */}
        <BalanceCard />

        {/* Recent Entries */}
        <LastMovements />
      </main>

      {/* Entry Form Modal */}
      <EntryForm />
    </div>
  );
}
