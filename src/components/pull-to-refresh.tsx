"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import LastMovementsSkeleton from "./last-movements-skeleton";
import BalanceCardSkeleton from "./balance-card-skeleton";

interface Props {
  children: ReactNode;
}

const PullToRefresh = dynamic(() => import("react-pull-to-refresh"), {
  ssr: false,
  loading: () => (
    <Fragment>
      <BalanceCardSkeleton />
      <LastMovementsSkeleton />
    </Fragment>
  ),
});

export default function PullToRefreshWrapper({ children }: Props) {
  const router = useRouter();

  const handleRefresh = async () => {
    router.refresh();
  };

  return <PullToRefresh onRefresh={handleRefresh}>{children}</PullToRefresh>;
}
