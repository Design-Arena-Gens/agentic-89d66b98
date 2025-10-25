import { ProductGrid } from "@/components/product-grid";
import { productData } from "@/data/products";

export const metadata = {
  title: "Lightning Deals | Nova Market",
  description: "Time-limited lightning deals refreshed hourly across Nova Market.",
};

const lightningDeals = productData.slice(0, 6);

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="rounded-4xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-emerald-900">Lightning deals</h1>
        <p className="mt-2 text-sm text-emerald-700">
          Moves fast — deals can expire in minutes. Prices shown reflect current discounts.
        </p>
      </header>
      <ProductGrid products={lightningDeals} />
    </div>
  );
}
