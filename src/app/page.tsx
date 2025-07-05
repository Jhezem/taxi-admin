import LastMovements from "@/components/last-movements";
import BalanceCard from "@/components/balance-card";
import PullToRefreshComponent from "../components/pull-to-refresh";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      {/* Main Content */}
      <PullToRefreshComponent />

      {/* Balance Card */}
      <BalanceCard />

      {/* Recent Entries */}
      <LastMovements />
    </Fragment>
  );
}
