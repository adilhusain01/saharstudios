import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "SAHAR STUDIOS | Bold & Liquid",
  description: "Creating Visual Masterpieces",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SAHAR STUDIOS | Bold & Liquid",
    description: "Creating Visual Masterpieces",
    url: "https://saharstudios.com", // Replace with your actual domain
    siteName: "Sahar Studios",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Sahar Studios Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAHAR STUDIOS | Bold & Liquid",
    description: "Creating Visual Masterpieces",
    images: ["/og.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased selection:bg-fuchsia-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
