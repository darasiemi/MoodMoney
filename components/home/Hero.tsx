import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-12 pb-6 sm:pt-20 sm:pb-8 overflow-x-hidden">
      {/* Dot-grid background pattern */}
      <div className="hero-pattern absolute inset-0 pointer-events-none" aria-hidden />


      <div className="relative flex flex-col lg:flex-row items-center gap-8">
        {/* Left — text content */}
        <div className="w-full lg:max-w-[48%] shrink-0">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] xl:text-[3.2rem] font-extrabold text-ucd-navy dark:text-white leading-[1.2] tracking-tight mb-4 lg:whitespace-nowrap">
            Mood &amp;{" "}
            <span className="relative inline-block">
              Money Lab
              {/* Gold underline — UCD brand identity */}
              <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-ucd-gold rounded-full" aria-hidden />
            </span>
            <br />
            <span className="text-lg sm:text-xl lg:text-2xl font-normal italic text-gray-400 dark:text-gray-500 lg:whitespace-nowrap">
              where finance meets mental health.
            </span>
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/ucd-logo.svg"
              alt="University College Dublin"
              width={48}
              height={69}
              className="object-contain"
              style={{ height: "auto" }}
            />
            <p className="text-base text-ucd-navy-700 dark:text-ucd-navy-200 font-medium uppercase tracking-widest" style={{ fontFamily: "var(--font-montserrat)" }}>
              University College Dublin
            </p>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
            We use machine learning and statistical analysis to understand
            how financial behaviour and mental health are interconnected — and to
            build tools that help people with mental health conditions, particularly bipolar, help manage their finances better.
          </p>

          <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
            Based at the School of Computer Science, we partner with clinical
            institutions, financial services, and patient advocacy groups to
            conduct research that is rigorous, fair, and grounded in real-world
            impact.
          </p>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <Link
              href="/research"
              className="px-8 py-3.5 bg-ucd-navy hover:bg-ucd-navy-800 text-white rounded-xl text-base font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              Our Research
            </Link>
            <Link
              href="/publications"
              className="px-8 py-3.5 border-2 border-ucd-navy text-ucd-navy dark:border-ucd-navy-200 dark:text-ucd-navy-200 hover:bg-ucd-navy hover:text-white dark:hover:bg-ucd-navy dark:hover:text-white rounded-xl text-base font-semibold transition-colors whitespace-nowrap"
            >
              Publications
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-ucd-green hover:bg-ucd-green/90 text-white rounded-xl text-base font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right — SVG: beside text on desktop, below buttons on mobile */}
        <div className="w-full lg:flex-1">
          <Image
            src="/images/financial-mood.svg"
            alt="Financial behaviour and mental health illustration"
            width={900}
            height={900}
            className="w-full h-auto object-contain rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
