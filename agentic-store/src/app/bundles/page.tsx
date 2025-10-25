import Link from "next/link";

export const metadata = {
  title: "Nova Bundles | Nova Market",
  description: "Curated bundle offers to save more on complementary products across categories.",
};

const bundles = [
  {
    name: "Creator Studio Bundle",
    savings: "$320 savings",
    description: "ZenBook X14 Ultra + Nova ANC Headphones + Atlas Pro Camera accessories kit",
  },
  {
    name: "Smart Home Starter",
    savings: "$180 savings",
    description: "Aurora Smart Speaker, Lumen Glow Smart Lamp, EverHome AirMax Purifier",
  },
  {
    name: "Wellness Reset",
    savings: "$140 savings",
    description: "Stride Runner Pro classes, Solace Elite Massage Gun, Cascade S9 Smartwatch",
  },
];

export default function Page() {
  return (
    <section className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Featured bundles</h1>
        <p className="text-sm text-slate-600">
          Combine your favorites and enjoy built-in savings. Subscribe to price alerts to be notified when
          bundle prices drop even further.
        </p>
      </header>
      <div className="space-y-4">
        {bundles.map((bundle) => (
          <article key={bundle.name} className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">{bundle.name}</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {bundle.savings}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{bundle.description}</p>
            <Link href="/checkout" className="mt-3 inline-flex text-sm font-semibold text-emerald-700">
              Customize bundle →
            </Link>
          </article>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Demo content — replace with personalized recommendations from your merchandising engine.
      </p>
    </section>
  );
}
