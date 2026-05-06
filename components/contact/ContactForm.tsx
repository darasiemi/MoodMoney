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
    "w-full px-3.5 py-2.5 rounded-lg border border-ucd-navy-100 dark:border-[#0e2155] bg-white dark:bg-[#071030] text-ucd-navy dark:text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-ucd-navy dark:focus:ring-ucd-gold transition";

  const labelClass = "block text-sm font-semibold text-ucd-navy dark:text-ucd-navy-200 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Subject</label>
        <select name="subject" required className={inputClass}>
          <option value="">Select a subject</option>
          <option value="collaboration">Research Collaboration</option>
          <option value="phd">PhD Enquiry</option>
          <option value="media">Media / Press</option>
          <option value="data">Data Access Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" required rows={5} placeholder="Your message…" className={inputClass} />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 p-3 bg-ucd-green-50 dark:bg-ucd-green-100/10 border border-ucd-green-100 dark:border-ucd-green/30 rounded-lg">
          <CheckCircle size={16} className="text-ucd-green shrink-0" />
          <p className="text-sm text-ucd-green dark:text-ucd-green-100 font-medium">
            Message sent! We will get back to you shortly.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
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
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-ucd-navy hover:bg-ucd-navy-800 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
      >
        <Send size={14} />
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
