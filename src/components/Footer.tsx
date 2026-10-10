import Link from "next/link";
import { Github, Twitter, Sparkles, Zap, Instagram, Mail } from "lucide-react";
import WhatsAppChannels from "./WhatsAppChannels";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-cyan-400/10 bg-black/30">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="text-neon">TOOLS ALL IN ONE</span>
              <span className="rounded border border-cyan-400/40 bg-cyan-400/15 px-1 py-[1px] text-[9px] font-bold uppercase text-cyan-300">
                Beta
              </span>
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted">
            One platform. Hundreds of useful tools. Fast, private, and free.
          </p>

          {/* Social icons */}
          <div className="mt-4 flex items-center gap-2">
            {[
              { href: "https://github.com", label: "Github", Icon: Github },
              { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
              { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
              { href: "mailto:hello@zann.id", label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/15 bg-cyan-400/5 text-muted transition hover:border-cyan-400/45 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
            <li><Link href="/tools" className="transition hover:text-white">Tools</Link></li>
            <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            <li><Link href="/about" className="transition hover:text-white">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/about#privacy" className="transition hover:text-white">Privacy</Link></li>
            <li><Link href="/about#terms" className="transition hover:text-white">Terms</Link></li>
            <li><a href="mailto:hello@zann.id" className="transition hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Follow Channel</h4>
          <WhatsAppChannels variant="footer" />
        </div>
      </div>

      <div className="border-t border-cyan-400/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} TOOLS ALL IN ONE (BETA). All rights reserved.</span>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            {/* WATERMARK */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
              <Zap className="h-3 w-3" />
              ©zann.id
            </span>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                aria-label="Github"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
