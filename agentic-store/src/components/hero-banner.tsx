import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl">
      <div className="max-w-xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
          Nova Prime Day • Ends tonight
        </span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Upgrade your every day with curated smart tech and premium essentials.
        </h1>
        <p className="text-lg text-slate-200">
          Discover lightning deals, member-only bundles, and personalized recommendations inspired by how you live, work, and play.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/deals"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
          >
            Explore deals
          </Link>
          <Link
            href="/categories/electronics"
            className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            Shop electronics
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-24 -top-32 hidden h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl sm:block" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 hidden h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl md:block" />
    </section>
  );
}
