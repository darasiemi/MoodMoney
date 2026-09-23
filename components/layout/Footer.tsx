import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t-4 border-ucd-gold bg-ucd-navy text-white dark:bg-ucd-navy-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="sm:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/ucd-logo.svg"
                alt="University College Dublin"
                width={38}
                height={55}
                className="object-contain shrink-0"
                style={{ height: "auto" }}
              />
              <p className="text-xl font-bold text-white">Mood &amp; Money Lab</p>
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
          <div className="sm:col-span-3">
            <p className="text-sm font-semibold text-white mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
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
                    className="text-sm text-ucd-navy-200 hover:text-white underline-offset-4 hover:underline transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="sm:col-span-3">
            <p className="text-sm font-semibold text-white mb-4">
              Connect
            </p>
            <ul className="space-y-3 text-sm text-ucd-navy-200 break-all">
              <li>
                <a
                  href="mailto:mark.matthews@ucd.ie"
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  mark.matthews@ucd.ie
                </a>
              </li>
              <li>
                <a
                  href="mailto:oluwadara.adedeji@ucdconnect.ie"
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  oluwadara.adedeji@ucdconnect.ie
                </a>
              </li>
              <li>
                <a
                  href="https://ucd.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  ucd.ie
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-ucd-navy-200">
            &copy; {year} &nbsp;Mood &amp; Money Lab, University College Dublin
          </p>
          <p className="text-xs text-ucd-navy-200/80">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
