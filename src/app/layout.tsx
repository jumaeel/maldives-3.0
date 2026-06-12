import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { themeScript } from "@/components/theme-toggle";

// One geometric sans family across the whole app (headings + body),
// matching the "Islamic services, made simple" style.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Maldives 3.0 — Research · Educate · Reform",
    template: "%s · Maldives 3.0",
  },
  description:
    "A technology-driven research, education and reform platform helping Maldivian society draw closer to the Quran and Sunnah upon the understanding of the first three generations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans">
        <div className="flex">
          <Sidebar />
          <div className="flex min-h-screen w-full min-w-0 flex-col">
            <Topbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
