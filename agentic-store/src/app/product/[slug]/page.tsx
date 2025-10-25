import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productData } from "@/data/products";
import { ProductDetail } from "@/components/product-detail";
import Link from "next/link";

type ProductParams = { slug: string };

export function generateStaticParams() {
  return productData.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const product = productData.find((item) => item.slug === resolved.slug);
  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Nova Market`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<ProductParams> }) {
  const resolved = await params;
  const match = productData.find((item) => item.slug === resolved.slug);

  if (!match) {
    notFound();
  }

  const product = match;

  const relatedProducts = productData
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <ProductDetail product={product} />

      {relatedProducts.length > 0 && (
        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Related items</h2>
            <Link href={`/?category=${product.category}`} className="text-sm text-slate-600 hover:text-slate-900">
              Shop more {product.category}
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-wide text-emerald-600">{item.brand}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-xs text-slate-500">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
