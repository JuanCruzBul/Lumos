import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
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
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
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
      image: `${siteUrl}/opengraph-image`,
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
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${quicksand.variable} font-quicksand font-normal antialiased overflow-x-clip`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1511831570147944');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1511831570147944&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
