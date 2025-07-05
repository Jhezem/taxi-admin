export default function LastMovementsSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-3">
      <h2 className="sr-only">Movimientos recientes</h2>

      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-xl shadow p-4 space-y-3"
        >
          {/* Simula el encabezado */}
          <div className="h-5 bg-gray-200 rounded w-1/3" />

          {/* Simula las líneas de texto */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />

          {/* Simula precio y fecha */}
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
