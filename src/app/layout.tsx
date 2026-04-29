import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porto Seguro Saúde — Elih Seguros | Cotação Gratuita de Plano de Saúde",
  description:
    "Solicite sua cotação gratuita dos melhores planos Porto Seguro Saúde para pessoa física, PME e empresas. Atendimento especializado pela Elih Seguros, correspondente autorizado Porto Seguro.",
  keywords: [
    "porto seguro saúde",
    "porto seguro plano de saúde",
    "porto saúde cotação",
    "plano de saúde porto seguro empresarial",
    "porto seguro saúde pme",
    "porto saúde empresarial",
    "cotação porto seguro saúde",
    "elih seguros",
    "corretora porto seguro",
  ],
  authors: [{ name: "Elih Seguros" }],
  creator: "Elih Seguros",
  metadataBase: new URL("https://portosaude-elih.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portosaude-elih.vercel.app",
    siteName: "Elih Seguros — Porto Seguro Saúde",
    title: "Porto Seguro Saúde com Atendimento Especializado | Elih Seguros",
    description:
      "Compare e contrate os melhores planos Porto Seguro Saúde. Atendimento 100% gratuito pela Elih Seguros, correspondente autorizado Porto Seguro.",
    images: [
      {
        url: "/images/porto-og.png",
        width: 1200,
        height: 630,
        alt: "Elih Seguros — Porto Seguro Saúde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porto Seguro Saúde — Elih Seguros",
    description: "Cotação gratuita dos melhores planos Porto Seguro Saúde para você e sua empresa.",
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
      "@type": "InsuranceAgency",
      "@id": "https://portosaude-elih.vercel.app/#organization",
      name: "Elih Seguros",
      description:
        "Correspondente autorizado Porto Seguro especializado em planos de saúde para pessoa física, MEI, PME e empresas.",
      url: "https://portosaude-elih.vercel.app",
      email: "elihseguros@gmail.com",
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      knowsAbout: [
        "Planos Porto Seguro Saúde",
        "Porto Saúde PME",
        "Porto Saúde Empresarial",
        "Porto Saúde Individual",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://portosaude-elih.vercel.app/#website",
      url: "https://portosaude-elih.vercel.app",
      name: "Elih Seguros — Porto Seguro Saúde",
      publisher: { "@id": "https://portosaude-elih.vercel.app/#organization" },
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
