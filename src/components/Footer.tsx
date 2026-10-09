import Link from "next/link";
import { Github, Twitter, Sparkles } from "lucide-react";
export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 bg-black/30">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-semibold">ALL IN ONE TOOLS ZanzzXit</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted">One platform. Hundreds of useful tools. Fast, private, and free.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/about#privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/about#terms" className="hover:text-white">Terms</Link></li>
            <li><a href="mailto:hello@zanzzxit.tools" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} ZanzzXit Tools.</span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Github" className="hover:text-white"><Github className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
