import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dot-grid background pattern */}
      <div className="hero-pattern absolute inset-0 pointer-events-none" aria-hidden />


      <div className="relative max-w-3xl pl-0 sm:pl-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ucd-navy dark:text-white leading-[1.1] tracking-tight mb-4">
          Mood &amp;{" "}
          <span className="relative inline-block">
            Money Lab
            {/* Gold underline — UCD brand identity */}
            <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-ucd-gold rounded-full" aria-hidden />
          </span>
          <br />
          <span className="text-2xl sm:text-3xl lg:text-4xl font-normal italic text-gray-400 dark:text-gray-500">
            where finance meets mental health.
          </span>
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/ucd-logo.svg"
            alt="University College Dublin"
            width={48}
            height={48}
            className="object-contain"
          />
          <p className="text-base text-ucd-navy-700 dark:text-ucd-navy-200 font-medium uppercase tracking-widest" style={{ fontFamily: "var(--font-montserrat)" }}>
            University College Dublin
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-5 leading-relaxed max-w-2xl">
          We use machine learning and statistical analysis to understand
          how financial behaviour and mental health are interconnected — and to
          build tools that help people with mental health conditions, particularly bipolar, help manage their finances better.
        </p>

        <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
          Based at the School of Computer Science, we partner with clinical
          institutions, financial services, and patient advocacy groups to
          conduct research that is rigorous, fair, and grounded in real-world
          impact.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/research"
            className="px-6 py-2.5 bg-ucd-navy hover:bg-ucd-navy-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            Our Research
          </Link>
          <Link
            href="/publications"
            className="px-6 py-2.5 border-2 border-ucd-navy text-ucd-navy dark:border-ucd-navy-200 dark:text-ucd-navy-200 hover:bg-ucd-navy hover:text-white dark:hover:bg-ucd-navy dark:hover:text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Publications
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-ucd-green hover:bg-ucd-green/90 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
