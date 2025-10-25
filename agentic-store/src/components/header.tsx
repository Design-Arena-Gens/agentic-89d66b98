"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useState, useTransition } from "react";

export function Header() {
  const { itemCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="bg-slate-900 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <span>Fast & free shipping on orders over $50</span>
          <Link href="/deals" className="underline-offset-2 hover:underline">
            Shop today&apos;s deals
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-semibold text-slate-900">
            Nova Market
          </Link>
          <span className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 md:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Prime eligible
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50/60 px-4 py-2 shadow-inner focus-within:border-slate-400"
        >
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, brands, and more"
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="ml-4 whitespace-nowrap rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isPending}
          >
            Search
          </button>
        </form>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/orders" className="hover:text-slate-900">
            Orders
          </Link>
          <Link href="/prime" className="hover:text-slate-900">
            Prime
          </Link>
          <Link href="/cart" className="relative rounded-full bg-slate-100 px-4 py-2 hover:bg-slate-200">
            Cart
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
              {itemCount}
            </span>
          </Link>
        </nav>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 text-sm text-slate-600">
          <Link href="/" className="font-medium text-slate-900">
            Home
          </Link>
          <Link href="/categories/electronics" className="hover:text-slate-900">
            Electronics
          </Link>
          <Link href="/categories/home" className="hover:text-slate-900">
            Home & Kitchen
          </Link>
          <Link href="/categories/fitness" className="hover:text-slate-900">
            Health & Fitness
          </Link>
          <Link href="/categories/fashion" className="hover:text-slate-900">
            Fashion
          </Link>
          <Link href="/categories/gaming" className="hover:text-slate-900">
            Gaming
          </Link>
          <Link href="/categories/beauty" className="hover:text-slate-900">
            Beauty
          </Link>
          <Link href="/gift-guide" className="hover:text-slate-900">
            Gift Guide
          </Link>
        </nav>
      </div>
    </header>
  );
}
