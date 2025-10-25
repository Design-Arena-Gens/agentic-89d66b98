export const metadata = {
  title: "Your Orders | Nova Market",
  description: "Track order status, initiate returns, and review your Nova Market purchase history.",
};

export default function Page() {
  return (
    <section className="space-y-4 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Your orders</h1>
      <p className="text-sm text-slate-600">
        Sign in to view your detailed order history, manage subscriptions, and download invoices.
      </p>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        This is a demo experience. In a production build, this page would authenticate customers and fetch
        order history from a secure API.
      </div>
    </section>
  );
}
