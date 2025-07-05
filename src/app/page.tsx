import { EntryForm } from "@/components/entry-form";
import LastMovements from "@/components/last-movements";
import Header from "@/components/header";
import BalanceCard from "@/components/balance-card";
import Footer from "@/components/footer";
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
