import { EntryForm } from "@/components/entry-form";
import LastMovements from "@/components/last-movements";
import Header from "@/components/header";
import BalanceCard from "@/components/balance-card";
import Footer from "@/components/footer";
import PullToRefreshWrapper from "../components/pull-to-refresh";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Main Content */}
      <PullToRefreshWrapper>
        <main className="px-4 py-6 max-w-md mx-auto">
          {/* Balance Card */}
          <BalanceCard />

          {/* Recent Entries */}
          <LastMovements />

          {/* Entry Form Modal */}
          <EntryForm />
        </main>
      </PullToRefreshWrapper>
      <Footer />
    </div>
  );
}
