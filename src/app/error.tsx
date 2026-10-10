"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-8">
      <div className="card max-w-md w-full text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <h1 className="text-lg font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted">
          Terjadi kesalahan saat memuat halaman. Coba lagi atau kembali ke beranda.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="btn-primary text-xs justify-center"
          >
            <RotateCw className="h-3.5 w-3.5" />
            Try Again
          </button>
          <Link href="/" className="btn-ghost text-xs justify-center">
            <Home className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
