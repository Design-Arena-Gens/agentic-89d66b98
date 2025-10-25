"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    Array.from({ length: quantity }).forEach(() =>
      addItem(product, { color: selectedColor, size: selectedSize }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-4xl border border-slate-200 bg-white">
          <Image
            src={product.images[selectedImage]?.src ?? "/products/placeholder.svg"}
            alt={product.images[selectedImage]?.alt ?? product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border ${index === selectedImage ? "border-slate-900" : "border-transparent"} bg-white shadow`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-600">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-3 text-sm text-slate-500">
            Rated {product.rating.toFixed(1)} ⭐ by {product.ratingCount.toLocaleString()} customers
          </p>
        </div>

        <p className="text-lg text-slate-600">{product.description}</p>

        <div className="flex items-baseline gap-3 border-y border-slate-200 py-4">
          <span className="text-3xl font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          {product.originalPrice && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Color</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">
            Quantity
            <select
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="ml-3 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700"
            >
              {Array.from({ length: Math.min(10, product.stock) }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <span className="text-sm text-emerald-600">{product.stock > 0 ? "In stock" : "Currently unavailable"}</span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="w-full rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-100"
          >
            Buy it now
          </button>
          {added && <p className="text-center text-sm text-emerald-600">Added to cart!</p>}
        </div>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Highlights
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Specifications
          </h3>
          <dl className="mt-3 grid gap-2 text-sm text-slate-600">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-6 rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="font-medium text-slate-700">{key}</dt>
                <dd className="text-right text-slate-500">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
