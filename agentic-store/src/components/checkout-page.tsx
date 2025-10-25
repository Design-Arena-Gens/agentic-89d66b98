"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

type Step = "shipping" | "payment" | "review";

export function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<Step>(items.length === 0 ? "review" : "shipping");
  const steps: Step[] = ["shipping", "payment", "review"];

  const estimatedTax = subtotal * 0.0825;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + estimatedTax + shipping;

  const handleContinue = () => {
    setStep((current) => {
      if (current === "shipping") return "payment";
      if (current === "payment") return "review";
      return "review";
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-4xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add products to your cart before continuing to checkout.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
          <p className="mt-2 text-sm text-slate-500">
            Secure checkout powered by Nova Shield with 256-bit encryption.
          </p>
        </header>

        <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          {steps.map((item, index) => (
            <li
              key={item}
              className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                steps.indexOf(step) >= index ? "bg-slate-900 text-white" : "bg-slate-100"
              }`}
            >
              <span className="text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
              <span className="capitalize">{item}</span>
            </li>
          ))}
        </ol>

        {step === "shipping" && (
          <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Shipping address</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-slate-700">
                First name
                <input
                  type="text"
                  placeholder="Jane"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Last name
                <input
                  type="text"
                  placeholder="Doe"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="md:col-span-2 flex flex-col text-sm font-medium text-slate-700">
                Street address
                <input
                  type="text"
                  placeholder="123 Market Street"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                City
                <input
                  type="text"
                  placeholder="Seattle"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                State
                <input
                  type="text"
                  placeholder="WA"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Zip code
                <input
                  type="text"
                  placeholder="98101"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Phone
                <input
                  type="tel"
                  placeholder="(555) 555-1234"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Continue to payment
            </button>
          </section>
        )}

        {step === "payment" && (
          <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Cardholder name
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Card number
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Expiration date
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Security code
                <input
                  type="text"
                  placeholder="123"
                  className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Review order
            </button>
          </section>
        )}

        {step === "review" && (
          <section className="space-y-5 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Order review</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Secure</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span>{product.name} × {quantity}</span>
                  <span>{formatCurrency(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Place order
            </button>
            <p className="text-xs text-slate-400">
              By placing your order, you agree to Nova Market&apos;s Terms of Use and Privacy Notice.
            </p>
          </section>
        )}
      </div>

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
          <p className="mt-3 text-xs text-slate-400">Qualifies for free returns within 30 days of delivery.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600">
          <h3 className="text-sm font-semibold text-slate-900">Need help?</h3>
          <p className="mt-2 text-xs text-slate-500">
            Chat with Nova Assistant 24/7 or call our customer care line at (800) 555-6677.
          </p>
        </div>
      </aside>
    </div>
  );
}
