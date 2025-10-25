import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, productData } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";

type CategoryParams = { category: string };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const category = categories.find((item) => item.id === resolved.category);
  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.label} | Nova Market`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<CategoryParams> }) {
  const resolved = await params;
  const category = categories.find((item) => item.id === resolved.category);
  if (!category) {
    notFound();
  }

  const products = productData.filter((product) => product.category === category.id);

  return (
    <div className="space-y-6">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">{category.label}</h1>
        <p className="mt-2 text-sm text-slate-600">{category.description}</p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
