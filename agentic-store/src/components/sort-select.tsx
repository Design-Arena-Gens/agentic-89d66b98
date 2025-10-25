"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type SortSelectProps = {
  total: number;
};

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "new", label: "Newest arrivals" },
];

export function SortSelect({ total }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const current = searchParams.get("sort") ?? options[0].value;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-sm text-slate-500">Showing {total} products</span>
      <label className="ml-auto flex items-center gap-2 text-sm font-medium text-slate-700">
        Sort by
        <select
          value={current}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams.toString());
            if (event.target.value === options[0].value) {
              params.delete("sort");
            } else {
              params.set("sort", event.target.value);
            }
            startTransition(() => {
              router.push(`${pathname}?${params.toString()}`);
            });
          }}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
          disabled={isPending}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
