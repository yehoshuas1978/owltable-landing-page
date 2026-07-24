import type { Metadata } from "next";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/structuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.owltable.net'),
  title: {
    default: "OwlMask | Safe data provisioning with OwlTable",
    template: "%s | OwlMask"
  },
  description: "OwlTable is the Jobs-first data provisioning platform in the OwlMask ecosystem, with masking, subsetting, validation evidence, and developer automation.",
  keywords: ["OwlMask", "OwlTable", "data provisioning", "data masking", "database subsetting", "PostgreSQL", "MySQL", "SQL Server"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "OwlMask | Safe data provisioning with OwlTable",
    description: "Provision realistic, protected test data with OwlTable and the OwlMask ecosystem.",
    url: 'https://www.owltable.net',
    siteName: 'OwlMask',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OwlMask and OwlTable data provisioning platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "OwlMask | Safe data provisioning with OwlTable",
    description: "Provision realistic, protected test data with OwlTable and the OwlMask ecosystem.",
  },
  verification: {
    google: 'RtbKq0_ovAEwfOmovJpnTFTP_m_dgz7eEAgsFdlKVy8',
  },
};

import { PostHogProvider } from '@/components/PostHogProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const productJsonLd = buildProductJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen">
        <PostHogProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "OwlMask",
                "url": "https://www.owltable.net",
                "logo": "https://www.owltable.net/owltable-logo.jpg",
                "email": "founder@owlmask.com",
                "description": "OwlMask builds the OwlTable data provisioning platform and the OwlMask SDK, LLM, and Code tools for safe, realistic test data.",
                "brand": [
                  { "@type": "Brand", "name": "OwlTable Data Provisioning Platform" },
                  { "@type": "Brand", "name": "OwlMask SDK" },
                  { "@type": "Brand", "name": "OwlMask LLM" },
                  { "@type": "Brand", "name": "OwlMask Code" },
                  { "@type": "Brand", "name": "OwlMask Complete Suite" }
                ]
              })
            }}
          />
          {productJsonLd.map((data) => (
            <JsonLd key={String(data['@id'])} data={data} />
          ))}
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
