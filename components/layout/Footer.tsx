import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ucd-navy dark:bg-ucd-navy-900 mt-24">
      {/* Gold accent bar */}
      <div className="h-1 bg-ucd-gold" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/ucd-logo.svg"
                alt="University College Dublin"
                width={28}
                height={40}
                className="object-contain shrink-0"
                style={{ height: "auto" }}
              />
              <p className="font-bold text-white">Mood &amp; Money Lab</p>
            </div>
            <p className="text-sm text-ucd-navy-200 leading-relaxed">
              School of Computer Science
              <br />
              University College Dublin
              <br />
              Belfield, Dublin 4, Ireland
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ucd-gold mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                ["Research", "/research"],
                ["Publications", "/publications"],
                ["People", "/people"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ucd-navy-200 hover:text-ucd-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ucd-gold mb-4">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-ucd-navy-200">
              <li>
                <a
                  href="mailto:mark.matthews@ucd.ie"
                  className="hover:text-ucd-gold transition-colors"
                >
                  mark.matthews@ucd.ie
                </a>
              </li>
              <li>
                <a
                  href="mailto:oluwadara.adedeji@ucdconnect.ie"
                  className="hover:text-ucd-gold transition-colors"
                >
                  oluwadara.adedeji@ucdconnect.ie
                </a>
              </li>
              <li>
                <a
                  href="https://ucd.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ucd-gold transition-colors"
                >
                  ucd.ie
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-ucd-navy-200">
            &copy; {year} &nbsp;Mood &amp; Money Lab, University College Dublin
          </p>
          <p className="text-xs text-ucd-navy-200/60">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
