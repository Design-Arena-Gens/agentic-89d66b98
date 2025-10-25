import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
        <p className="mt-2 text-sm text-slate-500">
          Try adjusting your filters or search for a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
