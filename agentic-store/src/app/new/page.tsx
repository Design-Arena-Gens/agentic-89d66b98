import { productData } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";

export const metadata = {
  title: "New Arrivals | Nova Market",
  description: "Discover the latest drops in tech, home, and wellness from Nova Market.",
};

const newArrivals = [...productData].reverse();

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Fresh arrivals</h1>
        <p className="mt-2 text-sm text-slate-600">
          Newly added items handpicked by our merchandising team. Check back every weekday for the latest
          additions.
        </p>
      </header>
      <ProductGrid products={newArrivals} />
    </div>
  );
}
