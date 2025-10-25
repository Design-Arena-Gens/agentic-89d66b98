"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  const estimatedTax = subtotal * 0.0825;
  const shipping = subtotal > 50 ? 0 : 6.99;
  const total = subtotal + estimatedTax + shipping;

  if (items.length === 0) {
    return (
      <div className="rounded-4xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Explore our latest arrivals and exclusive deals to find something you love.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Shopping Cart</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-4">
          {items.map(({ product, quantity, selectedColor, selectedSize }) => (
            <article
              key={`${product.id}-${selectedColor ?? ""}-${selectedSize ?? ""}`}
              className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row"
            >
              <div className="relative h-36 w-36 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
                <Image src={product.images[0]?.src ?? "/products/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="144px" />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                    <p className="text-sm text-slate-500">Sold by Nova Market • Ships in 2 days</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                      {selectedColor && <span>Color: {selectedColor}</span>}
                      {selectedSize && <span>Size: {selectedSize}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id, { color: selectedColor, size: selectedSize })}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="text-sm font-medium text-slate-700">
                    Qty
                    <select
                      value={quantity}
                      onChange={(event) =>
                        updateQuantity(product.id, Number(event.target.value), {
                          color: selectedColor,
                          size: selectedSize,
                        })
                      }
                      className="ml-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700"
                    >
                      {Array.from({ length: Math.min(product.stock, 10) }, (_, index) => index + 1).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    In stock
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">
                  {formatCurrency(product.price * quantity)}
                </p>
                {product.originalPrice && (
                  <p className="text-xs text-slate-400 line-through">
                    {formatCurrency(product.originalPrice * quantity)}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Estimated tax</dt>
              <dd>{formatCurrency(estimatedTax)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600"
          >
            Proceed to checkout
          </Link>
          <p className="mt-3 text-xs text-slate-400">Secure transaction • Backed by Nova Guarantee</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600">
          <h3 className="text-sm font-semibold text-slate-900">Have a promo code?</h3>
          <p className="mt-2 text-xs text-slate-500">Apply promo codes during checkout for additional savings.</p>
        </div>
      </aside>
    </div>
  );
}
