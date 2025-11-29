import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "OwlTable - The Capable Database Management Tool & SQL Client",
  description: "A powerful, ergonomic database management tool and SQL client designed for performance and developer productivity. Manage your data with ease.",
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
