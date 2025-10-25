export const metadata = {
  title: "Privacy Notice | Nova Market",
  description: "Understand how Nova Market collects, uses, and protects your data.",
};

export default function Page() {
  return (
    <section className="space-y-4 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Privacy notice</h1>
      <p className="text-sm text-slate-600">
        Nova Market values transparency. This demo highlights how you could present your privacy policies and
        compliance disclosures to customers.
      </p>
      <div className="space-y-3 text-sm text-slate-600">
        <p>• Personal data is used to tailor recommendations, process orders, and enhance customer support.</p>
        <p>• Customers can update notification preferences and request account deletion from their profile.</p>
        <p>• Cookies help Nova Market provide a seamless cross-device experience.</p>
      </div>
    </section>
  );
}
