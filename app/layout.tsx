import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { Spotlight } from "@/components/spotlight";
import { GrainyGradientBackdrop } from "@/components/grainy-gradient-backdrop";
import "./globals.css";

const aspekta = localFont({
  src: [
    { path: "../public/fonts/aspekta/Aspekta-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/aspekta/Aspekta-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/aspekta/Aspekta-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/aspekta/Aspekta-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/* The Figma reference mixes a bold sans with an italic serif for the
   display headline — Instrument Serif italic nails the look. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050608",
};

export const metadata: Metadata = {
  title: "Rutvik Gupta",
  description:
    "Rutvik Gupta is a software engineer in Toronto. Currently at Fathom Health working on LLM-driven medical coding infrastructure. Previously payments at DraftKings, autonomous-driving simulation at Huawei Noah's Ark, internal developer tools at TD Bank, and cognitive-neuroscience research at UTSC.",
  authors: [{ name: "Rutvik Gupta" }],
  openGraph: {
    title: "Rutvik Gupta",
    description:
      "Software engineer in Toronto. Backend, data, and AI systems across healthcare, payments, and research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${aspekta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GrainyGradientBackdrop />
        <Spotlight />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
