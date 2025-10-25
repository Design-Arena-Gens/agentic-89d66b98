import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryCarousel() {
  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Shop by category</h2>
        <Link href="/categories" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          View all
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 px-6 py-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow">
              {category.label.charAt(0)}
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-900">
                {category.label}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
