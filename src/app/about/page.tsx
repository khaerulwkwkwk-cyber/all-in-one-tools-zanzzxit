import { Sparkles, Zap, Shield, Heart } from "lucide-react";
export const metadata = { title: "About", description: "Tentang ALL IN ONE TOOLS ZanzzXit." };
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 py-8">
      <header>
        <span className="chip"><Sparkles className="h-3 w-3" /> About</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          ALL IN ONE TOOLS <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">ZanzzXit</span>
        </h1>
        <p className="mt-3 text-base text-muted">One platform. Hundreds of useful tools. Kami membangun kumpulan tools online yang cepat, praktis, dan gratis.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: Zap, t: "Cepat", d: "Sebagian besar tools berjalan client-side." },
          { icon: Shield, t: "Privasi", d: "Data tidak dikirim ke server kecuali diperlukan." },
          { icon: Heart, t: "Gratis", d: "Semua fitur dapat diakses tanpa registrasi." },
          { icon: Sparkles, t: "Modern", d: "UI/UX premium dark-futuristic." },
        ].map((x) => (
          <div key={x.t} className="card">
            <x.icon className="h-5 w-5 text-violet-300" />
            <h3 className="mt-3 text-sm font-semibold">{x.t}</h3>
            <p className="mt-1 text-xs text-muted">{x.d}</p>
          </div>
        ))}
      </div>
      <section id="privacy" className="card">
        <h2 className="text-lg font-semibold">Privacy</h2>
        <p className="mt-2 text-sm text-muted">Tools kami memproses data di browser Anda bila memungkinkan. Riwayat dan favorit disimpan lokal di browser (localStorage).</p>
      </section>
      <section id="terms" className="card">
        <h2 className="text-lg font-semibold">Terms</h2>
        <p className="mt-2 text-sm text-muted">Gunakan tools secara bertanggung jawab. Dilarang untuk spam, brute-force, atau melanggar syarat layanan pihak ketiga.</p>
      </section>
    </div>
  );
}
