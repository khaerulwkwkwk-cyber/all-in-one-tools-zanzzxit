export default function Loading() {
  return (
    <div className="space-y-6 py-8">
      <div className="skeleton h-8 w-1/3" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="mt-4 skeleton h-4 w-3/4" />
            <div className="mt-2 skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="mt-4 skeleton h-4 w-2/3" />
            <div className="mt-2 skeleton h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
