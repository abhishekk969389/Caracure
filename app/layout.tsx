import type { Metadata } from "next";
import { Exo_2, Mulish } from "next/font/google";
import "./globals.css";

// Headings (h1, h2) font
const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

// Body, nav, buttons, card titles font
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarAcure | Car Repair & Auto Services",
  description:
    "Trusted car care experts offering professional car repair and auto services.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}