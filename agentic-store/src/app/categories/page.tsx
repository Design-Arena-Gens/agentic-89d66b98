import Link from "next/link";
import { categories } from "@/data/products";

export const metadata = {
  title: "Shop by Category | Nova Market",
  description: "Browse all Nova Market categories and discover curated collections.",
};

export default function Page() {
  return (
    <section className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">All categories</h1>
        <p className="mt-2 text-sm text-slate-600">
          Explore Nova Market&apos;s top categories and dive into handpicked collections and deals.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-slate-900">{category.label}</h2>
            <p className="mt-1 text-sm text-slate-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
