import Link from "next/link";
import { Divider } from "@/components/ui/divider";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Our Work", href: "/#gallery" },
      { label: "Process", href: "/#process" },
      { label: "Equipment", href: "/compare" },
      { label: "Simulator Quiz", href: "/quiz" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="footer" className="border-t border-white/8 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center bg-celtic">
                <span className="font-heading text-sm font-bold text-[#0a0a0a]">G</span>
              </div>
              <span className="font-heading text-lg font-bold text-white">
                Golf Sim <span className="text-celtic">Gurus</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/40">
              Custom golf simulators for home and business. Serving
              Kemptville, Ottawa, and Eastern Ontario.
            </p>
            <a href="tel:+16136980787" className="mt-4 block font-mono text-sm text-white/40 transition-colors hover:text-celtic">
              613-698-0787
            </a>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-celtic">
                {group.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="my-12" variant="border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Golf Sim Gurus. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/30">
            Trackman &amp; Foresight Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
