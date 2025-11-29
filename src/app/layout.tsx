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
  },
  twitter: {
    card: 'summary_large_image',
    title: "OwlTable",
    description: "Manage your data with ease. The capable database management tool.",
  },
  verification: {
    google: 'RtbKqO_ovAEwfOmovJpnTFTP_m_dgz7eEAgs',
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
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
