import Link from "next/link";

const deals = [
  {
    title: "Lightning deals",
    description: "Up to 60% off smart home essentials",
    href: "/deals/lightning",
  },
  {
    title: "Bundles",
    description: "Save $200 on creator laptop bundles",
    href: "/bundles",
  },
  {
    title: "New arrivals",
    description: "Fresh drops from premium brands",
    href: "/new",
  },
];

export function DealStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {deals.map((deal) => (
        <Link
          key={deal.title}
          href={deal.href}
          className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-lg"
        >
          <h3 className="text-sm font-semibold text-emerald-900">{deal.title}</h3>
          <p className="mt-1 text-sm text-emerald-700">{deal.description}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Shop now →
          </p>
        </Link>
      ))}
    </div>
  );
}
