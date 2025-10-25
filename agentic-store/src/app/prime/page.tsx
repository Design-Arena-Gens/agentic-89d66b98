export const metadata = {
  title: "Nova Prime | Nova Market",
  description: "Unlock same-day delivery, exclusive deals, streaming, and more with Nova Prime membership.",
};

export default function Page() {
  return (
    <section className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Nova Prime</h1>
        <p className="mt-3 text-sm text-slate-600">
          Enjoy lightning-fast shipping, exclusive content, and curated shopping perks designed for our most
          loyal members.
        </p>
      </div>
      <ul className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
        {[
          "Unlimited same-day and next-day delivery on eligible items",
          "Prime Day access with member-only pricing",
          "Nova Music, Video, and Reading bundles",
          "Fresh grocery delivery in select cities",
        ].map((perk) => (
          <li key={perk} className="flex items-start gap-3 rounded-3xl bg-slate-50 px-5 py-4">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-400">
        Demo content — integrate your subscription service or CMS to surface real plan details and pricing.
      </p>
    </section>
  );
}
