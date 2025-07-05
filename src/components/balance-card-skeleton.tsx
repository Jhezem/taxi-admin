export default function BalanceCardSkeleton() {
  return (
    <div className="animate-pulse mb-6 border-0 shadow-sm bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-2">
        {/* Big number */}
        <div className="h-10 bg-gray-200 rounded w-1/2" />

        {/* Subtext */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-1" />
      </div>
    </div>
  );
}
