import { NextResponse } from "next/server";

// Configure your email provider here.
// Option 1: Resend (recommended) — npm install resend
// Option 2: Nodemailer with SMTP — npm install nodemailer
// Set LAB_EMAIL in your .env.local

const LAB_EMAIL = process.env.LAB_EMAIL ?? "lab@university.ac.uk";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = (await req.json()) as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ── Uncomment to use Resend ────────────────────────────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "website@yourdomain.com",
    //   to: LAB_EMAIL,
    //   replyTo: email,
    //   subject: `[Website] ${subject} — ${name}`,
    //   text: message,
    // });
    // ─────────────────────────────────────────────────────────────────────────

    // For now: log submission (replace with email sending above)
    console.log("Contact submission", { name, email, subject, message, to: LAB_EMAIL });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
