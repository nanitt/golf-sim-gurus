import Link from "next/link";
import Image from "next/image";
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
    <footer id="footer" className="border-t border-white/8 bg-celtic-dark text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/logos/golfsimgurus.png"
                alt="Golf Sim Gurus"
                width={314}
                height={120}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">
              Custom golf simulators for home and business. Serving
              Kemptville, Ottawa, and Eastern Ontario.
            </p>
            <a href="tel:+16136980787" className="mt-4 block font-mono text-sm text-cream/50 transition-colors hover:text-brass">
              613-698-0787
            </a>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brass">
                {group.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="my-12" variant="brass" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Golf Sim Gurus. All rights reserved.
          </p>
          <p className="font-mono text-xs text-cream/40">
            Trackman &amp; Foresight Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
