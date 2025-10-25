import Link from "next/link";

const footerLinks = [
  {
    title: "Get to Know Us",
    links: ["Careers", "Press Releases", "Investor Relations", "Corporate Responsibility"],
  },
  {
    title: "Make Money with Us",
    links: [
      "Sell products on Nova",
      "Affiliate program",
      "Advertise your products",
      "Self-publish with us",
    ],
  },
  {
    title: "Nova Payment Products",
    links: ["Nova Credit Card", "Gift Cards", "Reload your balance", "Currency converter"],
  },
  {
    title: "Let Us Help You",
    links: ["Your Orders", "Shipping Rates & Policies", "Returns & Replacements", "Nova Assistant"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-10 px-4 py-12">
        {footerLinks.map((section) => (
          <div key={section.title} className="min-w-[180px] flex-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {section.links.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 bg-slate-950/80 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm">
          <span className="font-semibold text-white">Nova Market</span>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Notice
            </Link>
            <span aria-hidden>•</span>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <span aria-hidden>•</span>
            <span>© {new Date().getFullYear()} Nova Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
