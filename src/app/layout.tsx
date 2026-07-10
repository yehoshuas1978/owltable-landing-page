import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.owlmask.com'),
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
    url: 'https://www.owlmask.com',
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
                "@type": "SoftwareApplication",
                "name": "OwlMask Suite",
                "operatingSystem": "Web",
                "applicationCategory": "DeveloperApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "1000.00",
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
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "A Jobs-first data provisioning platform for protected, realistic test databases with masking, subsetting, readiness assessment, and validation evidence.",
                "url": "https://www.owlmask.com",
                "author": {
                  "@type": "Organization",
                  "name": "OwlTable"
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
