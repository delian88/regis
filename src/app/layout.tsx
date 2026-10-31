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
  title: "Regis Integrated Services Limited — Affordable Luxury Real Estate & Construction Abuja",
  description:
    "Official website of Regis Integrated Services Limited (RISL). For over a decade, delivering 1,000+ affordable luxurious housing units, duplexes, and serviced plots across Abuja, including Regis Royale Estate, FHA Golden Jubilee Estate Mbora, Guzape terraces, and Lugbe/Idu land.",
  keywords: [
    "Regis Integrated Services Limited",
    "Regis Properties",
    "Regis Royale Estate",
    "FHA Golden Jubilee Estate Mbora",
    "Guzape Luxury Terraces Abuja",
    "Serviced Land Lugbe Abuja",
    "Idu Industrial Land Abuja",
    "Affordable Housing Nigeria",
    "Federal Housing Authority Partner",
    "Real Estate Developers Abuja",
  ],
  icons: {
    icon: "https://www.regis.com.ng/wp-content/uploads/2023/10/REGISlogo.jpg",
    apple: "https://www.regis.com.ng/wp-content/uploads/2023/10/REGISlogo.jpg",
  },
  openGraph: {
    title: "Regis Integrated Services Limited — Providing Affordable Housing for Deserving Nigerians",
    description: "Discover signature residential estates, luxury terrace duplexes, and prime serviced land in Abuja with flexible mortgage options.",
    type: "website",
    url: "https://regis.com.ng",
    siteName: "Regis Integrated Services Limited",
    images: [
      {
        url: "https://www.regis.com.ng/wp-content/uploads/2016/07/logoconstruction.png",
        width: 800,
        height: 250,
        alt: "Regis Integrated Services Limited Logo",
      },
    ],
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
