import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSenseScript from "@/components/AdSense/AdSenseScript";
import GoogleCMP from "@/components/GoogleCMP";
import GoogleConsentInit from "@/components/GoogleConsentInit";

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Jimmy Pocock",
  description: "Developer, Thinker, Conversationalist",
  keywords: "jimmy pocock, developer, austin, texas, roverpass, software engineer",
  openGraph: {
    title: "Jimmy Pocock",
    description: "Developer, Thinker, Conversationalist",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmy Pocock",
    description: "Developer, Thinker, Conversationalist",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <GoogleConsentInit />
        <GoogleAnalytics />
        <AdSenseScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Application Schema Markup - Customize for your app */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Jimmy Pocock",
              "description": "Developer, Thinker, Conversationalist",
              "url": "https://jimmypocock.com",
              "applicationCategory": "WebApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Jimmy Pocock"
              }
            })
          }}
        />
      </head>
      <body className={montserrat.className}>
        {children}
        <GoogleCMP />
      </body>
    </html>
  );
}