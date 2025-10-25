import { productData } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";

const trendingProducts = [...productData].sort((a, b) => b.ratingCount - a.ratingCount);

export const metadata = {
  title: "Trending Products | Nova Market",
  description: "See what the Nova Market community is shopping for right now.",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Trending now</h1>
        <p className="mt-2 text-sm text-slate-600">
          Top-selling items with soaring customer reviews. Updated continuously as shoppers check out.
        </p>
      </header>
      <ProductGrid products={trendingProducts} />
    </div>
  );
}
