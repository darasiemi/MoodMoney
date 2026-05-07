import Link from "next/link";

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
              <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-ucd-gold" aria-hidden>
                  <path d="M16 3 L27 8 L27 17 C27 23.5 21.5 28 16 30 C10.5 28 5 23.5 5 17 L5 8 Z" />
                  <path d="M12 14 L16 11 L20 14 L20 20 L16 22 L12 20 Z" fill="#003087" />
                </svg>
              </div>
              <p className="font-bold text-white">Mood &amp; Money Lab</p>
            </div>
            <p className="text-sm text-ucd-navy-200 leading-relaxed">
              AI &amp; Digital Mental Health Research Group
              <br />
              School of Computer Science
              <br />
              University College Dublin
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
                  href="https://twitter.com/moodmoneylab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ucd-gold transition-colors"
                >
                  @moodmoneylab
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/moodmoneylab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ucd-gold transition-colors"
                >
                  GitHub
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
            &copy; {year} Mood &amp; Money Lab, University College Dublin
          </p>
          <p className="text-xs text-ucd-navy-200/60">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
