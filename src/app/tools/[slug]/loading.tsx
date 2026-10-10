export default function ToolLoading() {
  return (
    <div className="space-y-6 py-4">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-8 w-2/3" />
      <div className="skeleton h-4 w-full max-w-2xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <div className="skeleton h-10 w-full rounded-xl" />
          <div className="mt-3 skeleton h-24 w-full rounded-xl" />
        </div>
        <div className="card">
          <div className="skeleton h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
