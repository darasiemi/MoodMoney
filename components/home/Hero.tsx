import Link from "next/link";
import Image from "next/image";
import financialMoodImage from "@/public/images/financial-mood.png";

export function Hero() {
  return (
    <section className="py-6 sm:py-14 lg:py-20">
      <div className="grid min-w-0 overflow-hidden rounded-2xl border border-ucd-navy-200 bg-[color:var(--surface)] shadow-lg sm:rounded-3xl lg:grid-cols-12 dark:border-[color:var(--border)]">
        <div className="relative min-w-0 bg-ucd-navy px-5 py-8 sm:px-10 sm:py-12 lg:col-span-5 lg:px-12 lg:py-14">
          <span className="absolute left-0 top-0 h-1.5 w-full bg-ucd-gold" aria-hidden />
          <h1 className="display-type mb-4 max-w-3xl text-[clamp(1.8rem,9vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:mb-5 sm:text-5xl lg:text-[3.5rem]">
            Mood &amp; Money Lab
          </h1>
          <p className="mb-6 text-lg font-semibold italic leading-7 text-ucd-gold sm:mb-7 sm:text-2xl">
            where finance meets mental health.
          </p>

          <div className="mb-7 flex w-full max-w-sm items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-sm sm:mb-8 sm:px-4">
            <Image src="/ucd-logo.svg" alt="University College Dublin" width={38} height={55} className="h-auto shrink-0 object-contain" />
            <p className="min-w-0 text-[0.68rem] font-bold uppercase leading-4 tracking-[0.06em] text-ucd-navy sm:text-sm sm:tracking-wider">University College Dublin</p>
          </div>

          <p className="mb-5 max-w-2xl text-[0.95rem] font-medium leading-6 text-white sm:text-lg sm:leading-8">
            We use machine learning and statistical analysis to understand
            how financial behaviour and mental health are interconnected — and to
            build tools that help people with mental health conditions, particularly bipolar, help manage their finances better.
          </p>

          <p className="mb-8 max-w-2xl text-[0.95rem] font-medium leading-6 text-ucd-navy-200 sm:text-base sm:leading-7">
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

        <div className="hero-pattern relative flex min-w-0 items-center justify-center overflow-hidden p-2 sm:p-4 lg:col-span-7 lg:p-5">
          <Image
            src={financialMoodImage}
            alt="Financial behaviour and mental health illustration"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="relative w-full h-auto rounded-xl object-contain"
            placeholder="blur"
            preload
          />
        </div>
      </div>
    </section>
  );
}
