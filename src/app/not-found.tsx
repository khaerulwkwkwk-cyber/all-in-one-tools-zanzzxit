import Link from "next/link";
import { Home, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-8">
      <div className="card max-w-md w-full text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
          <Compass className="h-6 w-6 text-cyan-300" />
        </div>
        <p className="text-5xl font-bold text-neon">404</p>
        <h1 className="mt-2 text-lg font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted">
          Halaman atau tool yang kamu cari tidak tersedia.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary text-xs justify-center">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <Link href="/tools" className="btn-ghost text-xs justify-center">
            <Search className="h-3.5 w-3.5" />
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
