import LastMovements from "@/components/features/movements/LastMovements";
import BalanceCard from "@/components/features/balance/BalanceCard";
import PullToRefreshComponent from "@/components/layout/PullToRefresh";
import { Suspense } from "react";
import PageSkeleton from "@/components/layout/PageSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {/* Main Content */}
      <PullToRefreshComponent />

      {/* Balance Card */}
      <BalanceCard />

      {/* Recent Entries */}
      <LastMovements />
    </Suspense>
  );
}
