import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { EnergyMesh } from "@/components/EnergyMesh";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gridvidya.co.in"),
  title: {
    default: "Gridvidya Pvt. Ltd. | Intelligent Power Grid & Microgrid Consultancy",
    template: "%s | Gridvidya Pvt. Ltd."
  },
  description:
    "Gridvidya Pvt. Ltd. is a power grid and microgrid consultancy delivering intelligent grid analytics, stability engineering, renewable integration advisory, and AI-driven grid optimization solutions for utilities, governments, and energy developers in India and global markets including North America, Europe, Australia, the Middle East, and Southeast Asia.",
  keywords: [
    "Power grid consultancy",
    "Microgrid consulting India",
    "Smart grid consulting",
    "Grid stability analysis",
    "Renewable integration consulting",
    "Electrical grid optimization",
    "Grid intelligence solutions",
    "Energy analytics consultancy",
    "International grid consulting services"
  ],
  authors: [{ name: "Gridvidya Pvt. Ltd." }],
  creator: "Gridvidya Pvt. Ltd.",
  publisher: "Gridvidya Pvt. Ltd.",
  alternates: {
    canonical: "https://www.gridvidya.co.in/"
  },
  openGraph: {
    title: "Gridvidya Pvt. Ltd. | Intelligent Power Grid & Microgrid Consultancy",
    description:
      "AI-native grid intelligence and microgrid advisory services for mission-critical energy infrastructure across India and international markets.",
    url: "https://www.gridvidya.co.in/",
    siteName: "Gridvidya Pvt. Ltd.",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gridvidya Pvt. Ltd. | Intelligent Power Grid Consultancy",
    description:
      "Advanced power grid analytics, stability engineering, and microgrid advisory services for utilities and energy developers worldwide."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Gridvidya Pvt. Ltd.",
              url: "https://www.gridvidya.co.in/",
              description:
                "Power grid and microgrid consultancy providing intelligent analytics, grid stability engineering, renewable integration advisory, and AI-driven energy optimization.",
              areaServed: [
                { "@type": "Country", name: "India" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "Canada" },
                { "@type": "Country", name: "United Kingdom" },
                { "@type": "Country", name: "Australia" },
                { "@type": "Country", name: "Germany" },
                { "@type": "Country", name: "United Arab Emirates" },
                { "@type": "Country", name: "Singapore" }
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bhubaneswar",
                addressCountry: "India"
              },
              serviceType: [
                "Power Grid Consultancy",
                "Microgrid Advisory",
                "Grid Stability Engineering",
                "Renewable Integration Consulting",
                "Energy Analytics"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} site-surface font-inter text-slate-800 antialiased`}>
        <EnergyMesh />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
