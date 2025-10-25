import Link from "next/link";
import { productData } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";

const dealsProducts = productData.filter((product) => product.badges?.length);

export const metadata = {
  title: "Deals & Promotions | Nova Market",
  description: "Shop lightning deals, limited-time offers, and member exclusives across Nova Market.",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Today&apos;s deals</h1>
        <p className="mt-2 text-sm text-slate-600">
          Exclusive savings on top-rated tech, home essentials, and wellness gear. New offers drop every few
          hours — keep checking back so you don&apos;t miss out.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-emerald-700">
          <Link href="/deals/lightning" className="rounded-full bg-emerald-100 px-4 py-2">
            Lightning deals
          </Link>
          <Link href="/bundles" className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-600">
            Value bundles
          </Link>
          <Link href="/new" className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-600">
            Fresh arrivals
          </Link>
        </div>
      </header>

      <ProductGrid products={dealsProducts} />
    </div>
  );
}
