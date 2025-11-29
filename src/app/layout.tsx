import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.owltable.net'),
  title: {
    default: "OwlTable - The Capable Database Management Tool & SQL Client",
    template: "%s | OwlTable"
  },
  description: "A powerful, ergonomic database management tool and SQL client designed for performance and developer productivity. Manage your data with ease.",
  keywords: ["OwlTable", "Owl Table", "owl-table", "Database Management", "SQL Client", "Postgres", "MySQL", "Database Tool"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "OwlTable - The Capable Database Management Tool",
    description: "Manage your data with ease. A powerful SQL client for modern developers.",
    url: 'https://www.owltable.net',
    siteName: 'OwlTable',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OwlTable - Database Management Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "OwlTable",
    description: "Manage your data with ease. The capable database management tool.",
  },
  verification: {
    google: 'RtbKq0_ovAEwfOmovJpnTFTP_m_dgz7eEAgsFdlKVy8',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen">
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
              "description": "A powerful, ergonomic database management tool and SQL client designed for performance and developer productivity. Supports PostgreSQL, MySQL, SQL Server, and more.",
              "url": "https://www.owltable.net",
              "author": {
                "@type": "Organization",
                "name": "OwlTable"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              },
              "featureList": [
                "Multi-database support (PostgreSQL, MySQL, SQL Server)",
                "Advanced SQL editor with syntax highlighting",
                "Data visualization and export",
                "Secure SSH tunneling and SSL/TLS encryption",
                "Schema management and migrations",
                "Performance monitoring"
              ]
            })
          }}
        />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
