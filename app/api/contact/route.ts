import { NextResponse } from "next/server";
import { Resend } from "resend";

const LAB_EMAIL = process.env.LAB_EMAIL ?? "lab@university.ac.uk";
const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: LAB_EMAIL,
      replyTo: email,
      subject: `[Website] ${subject} — ${name}`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
