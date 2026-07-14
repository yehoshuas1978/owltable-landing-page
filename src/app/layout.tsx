import type { Metadata } from "next";
import Footer from "@/components/Footer";
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
                  { "@type": "Brand", "name": "OwlTable" },
                  { "@type": "Brand", "name": "OwlMask SDK" },
                  { "@type": "Brand", "name": "OwlMask LLM" },
                  { "@type": "Brand", "name": "OwlMask Code" }
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "OwlMask Complete Suite",
                "operatingSystem": "Windows, macOS, Linux",
                "applicationCategory": "DeveloperApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "399.00",
                  "priceCurrency": "USD"
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "OwlTable",
                "applicationCategory": "DatabaseApplication",
                "operatingSystem": "Windows, macOS, Linux",
                "offers": {
                  "@type": "Offer",
                  "price": "299.00",
                  "priceCurrency": "USD"
                },
                "description": "A Jobs-first data provisioning platform for protected, realistic test databases with masking, subsetting, readiness assessment, and validation evidence.",
                "url": "https://www.owltable.net",
                "author": {
                  "@type": "Organization",
                  "name": "OwlMask"
                },
                "featureList": [
                  "Database provisioning jobs",
                  "Data masking and relational subsetting",
                  "Readiness assessment and validation evidence",
                  "PostgreSQL, MySQL, and SQL Server support"
                ]
              })
            }}
          />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
