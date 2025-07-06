export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse flex flex-col">
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>

      <section className="space-y-3 mt-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/5" />
            <div className="h-3 bg-gray-200 rounded w-2/5" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </section>

      {/* Footer Skeleton */}
      <footer className="px-4 py-4 max-w-md mx-auto">
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </footer>
    </div>
  );
}
