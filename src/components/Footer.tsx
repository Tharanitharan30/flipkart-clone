import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "About",
      links: ["Contact Us", "About Us", "Careers", "Flipkart Stories", "Press", "Corporate"],
    },
    {
      title: "Help",
      links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ", "Report Issue"],
    },
    {
      title: "Consumer Policy",
      links: ["Cancellation & Returns", "Terms Of Use", "Security", "Privacy", "Sitemap"],
    },
    {
      title: "Social",
      links: ["Facebook", "Twitter", "YouTube", "Instagram"],
    },
  ];
  return (
    <footer className="mt-6 bg-[#172337] pb-20 text-white md:pb-0">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-4 py-8 text-xs md:grid-cols-4 md:px-12 md:py-10">
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/60">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/60 md:flex-row md:px-12">
          <p>© 2025 Flipkart Clone — Demo project, not affiliated with Flipkart.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
