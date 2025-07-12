import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReWear | Sustainable Circular Fashion",
  description: "Join the circular fashion movement. Buy, sell, and swap pre-loved clothing for a sustainable wardrobe.",
  keywords: ["sustainable fashion", "circular fashion", "secondhand clothing", "pre-loved fashion", "eco-friendly clothing"],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#042f2e' }
  ],
  openGraph: {
    title: 'ReWear | Sustainable Circular Fashion',
    description: 'Join the circular fashion movement. Buy, sell, and swap pre-loved clothing for a sustainable wardrobe.',
    url: 'https://rewear-eco.com',
    siteName: 'ReWear',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReWear | Sustainable Circular Fashion',
    description: 'Join the circular fashion movement. Buy, sell, and swap pre-loved clothing for a sustainable wardrobe.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
