import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Mood & Money Lab at University College Dublin.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        Contact Us{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">we&apos;d love to hear from you.</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        We welcome enquiries from prospective collaborators, PhD applicants,
        journalists, and anyone interested in our research.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 max-w-4xl">
        {/* Left: Contact form */}
        <div>
          <h2 className="section-heading text-xl font-bold text-ucd-navy dark:text-white mb-5">
            Send a message
          </h2>
          <ContactForm />
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="section-heading text-xl font-bold text-ucd-navy dark:text-white mb-5">
            Find us
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5 text-ucd-navy dark:text-ucd-gold" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
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
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-ucd-navy dark:hover:text-ucd-gold transition-colors"
              >
                mark.matthews@ucd.ie
              </a>
            </div>

            <div className="flex items-center gap-3">
              <ExternalLink size={18} className="shrink-0 text-ucd-navy dark:text-ucd-gold" />
              <a
                href="https://twitter.com/moodmoneylab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-ucd-navy dark:hover:text-ucd-gold transition-colors"
              >
                @moodmoneylab
              </a>
            </div>

            <div className="flex items-center gap-3">
              <ExternalLink size={18} className="shrink-0 text-ucd-navy dark:text-ucd-gold" />
              <a
                href="https://github.com/moodmoneylab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-ucd-navy dark:hover:text-ucd-gold transition-colors"
              >
                github.com/moodmoneylab
              </a>
            </div>

            {/* PhD callout box */}
            <div className="mt-4 p-5 border-l-4 border-ucd-gold bg-ucd-gold-50 dark:bg-[#071030] dark:border-ucd-gold rounded-r-xl">
              <p className="text-sm font-bold text-ucd-navy dark:text-white mb-1">
                PhD Applications
              </p>
              <p className="text-sm text-ucd-navy-700 dark:text-gray-400 leading-relaxed">
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
