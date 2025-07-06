import LastMovements from "@/components/last-movements";
import BalanceCard from "@/components/balance-card";
import PullToRefreshComponent from "@/components/pull-to-refresh";
import { Suspense } from "react";
import PageSkeleton from "@/components/page-skeleton";

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
