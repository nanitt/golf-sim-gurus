import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://golfsimgurus.ca"),
  title: "Golf Sim Gurus | Custom Golf Simulators for Home & Business",
  description:
    "Custom golf simulators for home and business. High-end golf simulator design, engineering, and installation in Kemptville, Ottawa, and Eastern Ontario.",
  keywords: [
    "golf simulator",
    "custom golf simulator",
    "home golf simulator",
    "commercial golf simulator",
    "Trackman",
    "Foresight",
    "golf simulator Kemptville",
    "golf simulator Ottawa",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Golf Sim Gurus",
    title: "Golf Sim Gurus | Custom Golf Simulators",
    description: "Custom golf simulators for home and business in Kemptville, Ottawa, and Eastern Ontario.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golf Sim Gurus | Custom Golf Simulators",
    description: "Custom golf simulators for home and business in Kemptville, Ottawa, and Eastern Ontario.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
