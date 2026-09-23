"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full min-h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3.5 py-3 text-base text-[color:var(--foreground)] placeholder:text-gray-500 transition-colors hover:border-ucd-navy-200 focus:border-ucd-navy focus:outline-none";

  const labelClass = "block text-sm font-semibold text-[color:var(--foreground)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>Subject</label>
        <select id="contact-subject" name="subject" required className={inputClass}>
          <option value="">Select a subject</option>
          <option value="collaboration">Research Collaboration</option>
          <option value="phd">PhD Enquiry</option>
          <option value="media">Media / Press</option>
          <option value="data">Data Access Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea id="contact-message" name="message" required rows={5} placeholder="Your message…" className={inputClass} />
      </div>

      {status === "success" && (
        <div role="status" className="flex items-center gap-2 p-3 bg-ucd-green-50 dark:bg-ucd-green-100/10 border border-ucd-green-100 dark:border-ucd-green/30 rounded-lg">
          <CheckCircle size={16} className="text-ucd-green shrink-0" />
          <p className="text-sm text-ucd-green dark:text-ucd-green-100 font-medium">
            Message sent! We will get back to you shortly.
          </p>
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
          <AlertCircle size={16} className="text-red-600 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">
            Something went wrong. Email us at{" "}
            <a href="mailto:lab@ucd.ie" className="underline">lab@ucd.ie</a>.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-ucd-navy px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ucd-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={14} />
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
