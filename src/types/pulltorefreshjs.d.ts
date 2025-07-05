declare module "pulltorefreshjs" {
  export interface PullToRefreshOptions {
    mainElement: string | HTMLElement;
    onRefresh: () => void;
    instructionsPullToRefresh?: string;
    instructionsReleaseToRefresh?: string;
    instructionsRefreshing?: string;
    iconArrow?: string;
    iconRefreshing?: string;
    distThreshold?: number;
    distMax?: number;
    distReload?: number;
    distIgnore?: number;
    triggerElement?: string;
    passive?: boolean;
    shouldPullToRefresh?: (el: HTMLElement) => boolean;
    onInit?: () => void;
    onPullStart?: () => void;
    onPullMove?: (distance: number) => void;
    onPullEnd?: () => void;
    [key: string]: unknown;
  }

  export function init(opts: PullToRefreshOptions): void;
  export function destroyAll(): void;

  const PullToRefresh: {
    init: typeof init;
    destroyAll: typeof destroyAll;
  };
  export default PullToRefresh;
}
