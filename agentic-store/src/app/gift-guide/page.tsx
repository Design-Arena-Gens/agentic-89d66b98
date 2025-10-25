import Link from "next/link";

export const metadata = {
  title: "Gift Guide | Nova Market",
  description: "Curated gift ideas for every occasion from Nova Market stylists.",
};

const collections = [
  {
    title: "Tech for creators",
    description: "Gear for content pros and creatives — think laptops, cameras, and audio.",
  },
  {
    title: "Wellness boosters",
    description: "Fitness trackers, massage therapy, and recovery essentials.",
  },
  {
    title: "Smart home essentials",
    description: "Make every space more intuitive with connected lighting and assistants.",
  },
  {
    title: "Kitchen upgrades",
    description: "Elevate home cooking with premium appliances and tools.",
  },
];

export default function Page() {
  return (
    <section className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Gift guide</h1>
        <p className="text-sm text-slate-600">
          Browse curated collections for every budget and personality. Save your favorites and share them with
          friends via a single link.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((collection) => (
          <article key={collection.title} className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">{collection.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{collection.description}</p>
            <Link href="/" className="mt-3 inline-flex text-sm font-semibold text-emerald-700">
              Explore collection →
            </Link>
          </article>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Demo content — tie this page to your personalization engine for dynamic collections.
      </p>
    </section>
  );
}
