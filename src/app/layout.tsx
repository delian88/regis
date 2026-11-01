import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://regis-ruby.vercel.app"),
  title: {
    default: "Regis Integrated Services Limited — Affordable Luxury Real Estate & Construction Abuja",
    template: "%s | Regis Integrated Services Limited",
  },
  description:
    "Official portal of Regis Integrated Services Limited (RISL). Leading Nigerian real estate development and turnkey construction company. Explore Regis Royale Estate, Guzape luxury terraces, FHA Mbora duplexes, and serviced land in Lugbe and Idu, Abuja.",
  keywords: [
    "Regis Integrated Services Limited",
    "RISL Nigeria",
    "Regis Properties Abuja",
    "Regis Royale Estate",
    "FHA Golden Jubilee Estate Mbora",
    "Guzape Luxury Terraces Abuja",
    "Serviced Plots Lugbe Abuja",
    "Idu Industrial Land Abuja",
    "Affordable Housing Nigeria",
    "Turnkey Construction Abuja",
    "Federal Housing Authority Partner",
    "Real Estate Developers Abuja",
  ],
  authors: [{ name: "Regis Integrated Services Limited", url: "https://regis-ruby.vercel.app" }],
  creator: "Regis Integrated Services Limited",
  publisher: "Regis Integrated Services Limited",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://regis-ruby.vercel.app",
    siteName: "Regis Integrated Services Limited",
    title: "Regis Integrated Services Limited — Affordable Luxury Real Estate & Construction Abuja",
    description:
      "Official portal of Regis Integrated Services Limited (RISL). Leading Nigerian real estate development and turnkey construction company. Explore Regis Royale Estate, Guzape luxury terraces, FHA Mbora duplexes, and serviced land in Lugbe and Idu, Abuja.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Regis Integrated Services Limited — Real Estate & Construction Abuja",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regis Integrated Services Limited — Affordable Luxury Real Estate & Construction Abuja",
    description:
      "Official portal of Regis Integrated Services Limited (RISL). Leading Nigerian real estate development and turnkey construction company. Explore Regis Royale Estate, Guzape luxury terraces, FHA Mbora duplexes, and serviced land in Lugbe and Idu, Abuja.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://regis-ruby.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
