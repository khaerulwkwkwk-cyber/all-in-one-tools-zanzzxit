export default function ToolsLoading() {
  return (
    <div className="space-y-6 py-4">
      <div className="skeleton h-8 w-48" />
      <div className="card !p-3">
        <div className="skeleton h-11 w-full rounded-xl" />
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="skeleton h-7 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="mt-4 skeleton h-4 w-2/3" />
            <div className="mt-2 skeleton h-3 w-full" />
            <div className="mt-2 skeleton h-3 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
