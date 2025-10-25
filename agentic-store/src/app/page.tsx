import Link from "next/link";
import { Suspense } from "react";
import { DealStrip } from "@/components/deal-strip";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryCarousel } from "@/components/category-carousel";
import { FilterSidebar } from "@/components/filter-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { SortSelect } from "@/components/sort-select";
import { categories, productData } from "@/data/products";

type SearchParams = Record<string, string | string[] | undefined>;

type Filters = {
  q?: string;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
  tag?: string;
};

function filterProducts(params: Filters) {
  const query = params.q?.toLowerCase().trim();
  const selectedCategory = params.category && params.category !== "all" ? params.category : null;
  const selectedTag = params.tag?.toLowerCase();

  let minPrice = 0;
  let maxPrice = Number.POSITIVE_INFINITY;
  if (params.price && params.price !== "all") {
    if (params.price.endsWith("+")) {
      minPrice = Number(params.price.replace("+", "")) || 0;
    } else {
      const [min, max] = params.price.split("-").map(Number);
      if (!Number.isNaN(min)) minPrice = min;
      if (!Number.isNaN(max)) maxPrice = max;
    }
  }

  const minRating = params.rating ? Number(params.rating) : null;

  let results = productData.filter((product) => {
    const matchesSearch = query
      ? [product.name, product.description, product.longDescription, product.brand, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    const matchesTag = selectedTag ? product.tags.some((tag) => tag.toLowerCase() === selectedTag) : true;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    const matchesRating = minRating ? product.rating >= minRating : true;

    return matchesSearch && matchesCategory && matchesTag && matchesPrice && matchesRating;
  });

  switch (params.sort) {
    case "price-asc":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results = [...results].sort((a, b) => b.rating - a.rating);
      break;
    case "new":
      results = [...results].sort((a, b) => b.ratingCount - a.ratingCount);
      break;
    default:
      results = [...results].sort((a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount);
  }

  return results;
}

function getCategoryLabel(id: string | undefined) {
  if (!id) return null;
  const match = categories.find((category) => category.id === id);
  return match?.label ?? null;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const normalize = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value ?? undefined;

  const filters: Filters = {
    q: normalize(resolvedSearchParams.q),
    category: normalize(resolvedSearchParams.category),
    price: normalize(resolvedSearchParams.price),
    rating: normalize(resolvedSearchParams.rating),
    sort: normalize(resolvedSearchParams.sort),
    tag: normalize(resolvedSearchParams.tag),
  };

  const filteredProducts = filterProducts(filters);
  const recommended = [...productData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const trending = [...productData]
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 4);
  const activeCategoryLabel = getCategoryLabel(filters.category);

  return (
    <div className="space-y-10">
      <HeroBanner />

      <DealStrip />

      <CategoryCarousel />

      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            {activeCategoryLabel ? `${activeCategoryLabel} picks` : "Recommended for you"}
          </h2>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            {Array.from(new Set(productData.flatMap((product) => product.tags)))
              .slice(0, 6)
              .map((tag) => (
                <Link
                  key={tag}
                  href={`/?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-slate-200 px-3 py-1 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  #{tag}
                </Link>
              ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-600">Top rated</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{product.description}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_3fr]">
        <Suspense fallback={<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" />}>
          <FilterSidebar totalResults={filteredProducts.length} />
        </Suspense>
        <div className="space-y-6">
          <SortSelect total={filteredProducts.length} />
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Trending right now</h2>
          <Link href="/trending" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            See more
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trending.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex flex-col gap-1 rounded-3xl border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {product.badges?.[0] ?? "Trending"}
              </span>
              <p className="text-sm font-semibold text-slate-900">{product.name}</p>
              <p className="text-xs text-slate-500">{product.rating.toFixed(1)} ⭐ {product.ratingCount.toLocaleString()} reviews</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
