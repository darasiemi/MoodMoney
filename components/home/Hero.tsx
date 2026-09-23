import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div className="grid overflow-hidden rounded-3xl border border-ucd-navy-200 bg-[color:var(--surface)] shadow-lg lg:grid-cols-12 dark:border-[color:var(--border)]">
        <div className="relative bg-ucd-navy px-7 py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:px-12 lg:py-14">
          <span className="absolute left-0 top-0 h-1.5 w-full bg-ucd-gold" aria-hidden />
          <h1 className="display-type max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] tracking-[-0.035em] mb-5">
            Mood &amp; Money Lab
          </h1>
          <p className="text-xl sm:text-2xl font-semibold italic text-ucd-gold mb-7">
            where finance meets mental health.
          </p>

          <div className="mb-8 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
            <Image src="/ucd-logo.svg" alt="University College Dublin" width={38} height={55} className="object-contain" style={{ height: "auto" }} />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ucd-navy">University College Dublin</p>
          </div>

          <p className="mb-5 max-w-2xl text-base font-medium leading-7 text-white sm:text-lg sm:leading-8">
            We use machine learning and statistical analysis to understand
            how financial behaviour and mental health are interconnected — and to
            build tools that help people with mental health conditions, particularly bipolar, help manage their finances better.
          </p>

          <p className="mb-8 max-w-2xl text-base font-medium leading-7 text-ucd-navy-200">
            Based at the School of Computer Science, we partner with clinical
            institutions, financial services, and patient advocacy groups to
            conduct research that is rigorous, fair, and grounded in real-world
            impact.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/research"
              className="inline-flex min-h-11 items-center rounded-lg bg-ucd-gold px-5 py-3 text-sm font-bold text-ucd-navy-900 shadow-sm transition-colors hover:bg-ucd-gold-100"
            >
              Our Research
            </Link>
            <Link
              href="/publications"
              className="inline-flex min-h-11 items-center rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ucd-navy"
            >
              Publications
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-semibold text-white underline decoration-2 underline-offset-4 transition-colors hover:text-ucd-gold"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="hero-pattern relative flex items-center justify-center overflow-hidden p-2 sm:p-4 lg:col-span-7 lg:p-5">
          <Image
            src="/images/financial-mood.png"
            alt="Financial behaviour and mental health illustration"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="relative w-full h-auto rounded-xl object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
