"use client";

import { categories as categoryList } from "@/data/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const priceRanges = [
  { label: "Under $200", value: "0-200" },
  { label: "$200 to $500", value: "200-500" },
  { label: "$500 to $1,000", value: "500-1000" },
  { label: "$1,000 & Above", value: "1000+" },
];

const ratingOptions = [
  { label: "4 stars & up", value: "4" },
  { label: "4.5 stars & up", value: "4.5" },
  { label: "Only 5 stars", value: "5" },
];

type FilterSidebarProps = {
  totalResults: number;
};

export function FilterSidebar({ totalResults }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedPrice = searchParams.get("price") ?? "all";
  const selectedRating = searchParams.get("rating") ?? "all";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:w-72">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {totalResults} results
        </span>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</h3>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100">
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === "all"}
                onChange={(event) => updateParam("category", event.target.value)}
                className="h-3.5 w-3.5"
              />
              <span>All</span>
            </label>
            {categoryList.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(event) => updateParam("category", event.target.value)}
                  className="h-3.5 w-3.5"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price</h3>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100">
              <input
                type="radio"
                name="price"
                value="all"
                checked={selectedPrice === "all"}
                onChange={(event) => updateParam("price", event.target.value)}
                className="h-3.5 w-3.5"
              />
              <span>Any price</span>
            </label>
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
              >
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={selectedPrice === range.value}
                  onChange={(event) => updateParam("price", event.target.value)}
                  className="h-3.5 w-3.5"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rating</h3>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100">
              <input
                type="radio"
                name="rating"
                value="all"
                checked={selectedRating === "all"}
                onChange={(event) => updateParam("rating", event.target.value)}
                className="h-3.5 w-3.5"
              />
              <span>Any rating</span>
            </label>
            {ratingOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
              >
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={selectedRating === option.value}
                  onChange={(event) => updateParam("rating", event.target.value)}
                  className="h-3.5 w-3.5"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-60"
          onClick={() => {
            startTransition(() => {
              router.push(pathname);
            });
          }}
          disabled={isPending}
        >
          Clear filters
        </button>
      </div>
    </aside>
  );
}
