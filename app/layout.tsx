import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Mood & Money Lab",
    default: "Mood & Money Lab – Digital Mental Health Research",
  },
  description:
    "The Mood & Money Lab uses machine learning and NLP to study the intersection of financial behaviour and mental health. Department of Computer Science.",
  openGraph: {
    type: "website",
    siteName: "Mood & Money Lab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
