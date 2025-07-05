"use client";

import { useEffect } from "react";
import PullToRefresh from "pulltorefreshjs";
import { useRouter } from "next/navigation";

export default function PullToRefreshComponent() {
  const router = useRouter();
  useEffect(() => {
    PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        router.refresh();
      },
      instructionsPullToRefresh: "↓ Desliza para refrescar",
      instructionsReleaseToRefresh: "↑ Suelta para refrescar",
      instructionsRefreshing: "⟳ Actualizando…",
    });

    return () => {
      PullToRefresh.destroyAll();
    };
  }, []);

  return null;
}
