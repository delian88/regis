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
  title: "Real Estate & Property in Nigeria for Sale and Rent - Nigeria Property Centre",
  description:
    "Nigerian real estate and property website with property in Nigeria for sale, rent and lease. Find details of property in Nigeria including homes, houses, lands, shops, office spaces and commercial properties.",
  keywords: [
    "Nigeria Property Centre",
    "Real Estate Nigeria",
    "Houses for sale in Lagos",
    "Apartments for rent in Abuja",
    "Flats for rent in Lekki",
    "Land for sale in Nigeria",
  ],
  openGraph: {
    title: "Real Estate & Property in Nigeria for Sale and Rent - Nigeria Property Centre",
    description: "Property Centre: find your next home. Homes and land to buy, rent and short let.",
    type: "website",
    url: "https://nigeriapropertycentre.com",
    siteName: "Nigeria Property Centre",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-red-500 selection:text-white flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
