import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-quicksand",
});

const siteUrl = "https://lumoshogar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lumos — Domótica y Hogar Inteligente",
    template: "%s | Lumos",
  },
  description:
    "Lumos transforma tu hogar en un espacio inteligente. Automatización de luces, clima, seguridad y energía con instalación profesional en Argentina.",
  keywords: [
    "domótica",
    "hogar inteligente",
    "automatización del hogar",
    "smart home Argentina",
    "control de luces inteligente",
    "termostato inteligente",
    "seguridad hogar",
    "ahorro energético hogar",
    "Alexa Google Home Home Assistant",
    "instalación domótica",
  ],
  authors: [{ name: "Lumos", url: siteUrl }],
  creator: "Lumos",
  publisher: "Lumos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Lumos",
    title: "Lumos — Domótica y Hogar Inteligente",
    description:
      "Transforma tu hogar en un espacio inteligente. Luces, clima, seguridad y energía automatizados con instalación profesional.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumos — Hogar Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumos — Domótica y Hogar Inteligente",
    description:
      "Transforma tu hogar en un espacio inteligente. Luces, clima, seguridad y energía automatizados con instalación profesional.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Lumos",
      description: "Domótica y Hogar Inteligente",
      inLanguage: "es-AR",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Lumos",
      description:
        "Empresa especializada en domótica y automatización del hogar. Instalación profesional de sistemas de luces, clima, seguridad y energía inteligente.",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/og-image.png`,
      areaServed: {
        "@type": "Country",
        name: "Argentina",
      },
      serviceType: [
        "Domótica",
        "Automatización del hogar",
        "Instalación smart home",
        "Control de iluminación",
        "Climatización inteligente",
        "Seguridad del hogar",
      ],
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${quicksand.variable} font-quicksand font-normal antialiased overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
