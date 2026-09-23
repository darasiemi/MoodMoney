import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Mood & Money Lab at University College Dublin.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <header className="page-intro mb-16">
        <div><h1 className="page-title">Contact Us <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">we&apos;d love to hear from you.</span></h1></div>
      <p className="page-deck">
        We welcome enquiries from prospective collaborators, PhD applicants,
        journalists, and anyone interested in our research.
      </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left: Contact form */}
        <div className="lg:col-span-7">
          <h2 className="section-heading text-2xl font-semibold text-[color:var(--foreground)] mb-8">
            Send a message
          </h2>
          <ContactForm />
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5">
          <h2 className="section-heading text-2xl font-semibold text-[color:var(--foreground)] mb-8">
            Find us
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5 text-ucd-navy dark:text-ucd-gold" />
              <div className="content-copy text-base">
                <p className="font-semibold text-ucd-navy dark:text-white">Mood &amp; Money Lab</p>
                <p>School of Computer Science</p>
                <p>University College Dublin</p>
                <p>Belfield, Dublin 4, Ireland</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-ucd-navy dark:text-ucd-gold" />
              <a
                href="mailto:mark.matthews@ucd.ie"
                className="text-base text-ucd-navy underline underline-offset-4 hover:text-ucd-navy-700 dark:text-ucd-navy-200 transition-colors"
              >
                mark.matthews@ucd.ie
              </a>
            </div>


            {/* PhD callout box */}
            <div className="mt-8 rounded-xl border border-[color:var(--border)] border-l-4 border-l-ucd-gold bg-[color:var(--surface)] p-6 shadow-sm">
              <p className="text-base font-bold text-ucd-navy dark:text-white mb-1">
                PhD Applications
              </p>
              <p className="content-copy text-base leading-relaxed">
                We typically recruit 1–2 PhD students per year. Please include
                your CV and a brief research statement when reaching out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
