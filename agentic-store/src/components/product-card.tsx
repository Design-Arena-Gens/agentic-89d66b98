import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] bg-slate-100">
        <Image
          src={product.images[0]?.src ?? "/placeholder.svg"}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
        />
        {product.badges?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
            {product.badges[0]}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-600">{product.brand}</p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
          </div>
          {discount && (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              -{discount}%
            </span>
          )}
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-amber-500">
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-slate-500">({product.ratingCount.toLocaleString()})</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-5">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
