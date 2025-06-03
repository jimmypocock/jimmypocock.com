import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Configure Noto Sans for UI elements
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
});

// Configure Noto Serif for content
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jimmypocock.com"),
  title: {
    default: "Jimmy Pocock - Co-founder & CTO at RoverPass | Tech Leader & Musician",
    template: "%s | Jimmy Pocock"
  },
  description: "Jimmy Pocock is a tech leader, Co-founder & CTO at RoverPass, and musician based in Austin, Texas. Scaled RoverPass to $5.2M revenue. Creator of Vocal Technique Translator and SongSnips.",
  keywords: [
    "jimmy pocock",
    "jimmy pocock austin",
    "jimmy pocock roverpass",
    "roverpass cto",
    "austin tech leader",
    "software engineer austin",
    "vocal technique translator",
    "songsnips",
    "tech entrepreneur austin",
    "musician developer",
    "austin cto",
    "texas software engineer"
  ],
  authors: [{ name: "Jimmy Pocock", url: "https://jimmypocock.com" }],
  creator: "Jimmy Pocock",
  publisher: "Jimmy Pocock",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Jimmy Pocock - Co-founder & CTO at RoverPass",
    description: "Tech leader and musician based in Austin, Texas. Co-founder & CTO at RoverPass, scaled to $5.2M revenue. Creator of innovative music tech projects.",
    url: "https://jimmypocock.com",
    siteName: "Jimmy Pocock",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/thinker.png",
        width: 1200,
        height: 630,
        alt: "Jimmy Pocock - Tech Leader & Musician",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmy Pocock - Co-founder & CTO at RoverPass",
    description: "Tech leader and musician based in Austin, Texas. Co-founder & CTO at RoverPass, scaled to $5.2M revenue.",
    images: ["/thinker.png"],
    creator: "@jimmypocock",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-code-here",
  },
  alternates: {
    canonical: "https://jimmypocock.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Jimmy Pocock" />
        <meta property="article:author" content="Jimmy Pocock" />
        <meta property="profile:first_name" content="Jimmy" />
        <meta property="profile:last_name" content="Pocock" />
        <meta property="og:locale:alternate" content="en_GB" />
        <link rel="canonical" href="https://jimmypocock.com" />
        <link rel="author" href="https://jimmypocock.com" />
        <link rel="me" href="https://github.com/jimmypocock" />
        <link rel="me" href="https://linkedin.com/in/jimmypocock" />
        <GoogleAnalytics />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Comprehensive Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://jimmypocock.com/#person",
                "name": "Jimmy Pocock",
                "givenName": "Jimmy",
                "familyName": "Pocock",
                "url": "https://jimmypocock.com",
                "image": "https://jimmypocock.com/thinker.png",
                "jobTitle": "Co-founder & CTO",
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://jimmypocock.com/#roverpass",
                  "name": "RoverPass",
                  "url": "https://roverpass.com"
                },
                "alumniOf": {
                  "@type": "Organization",
                  "name": "RoverPass",
                  "description": "Scaled to $5.2M revenue"
                },
                "knowsAbout": [
                  "Software Engineering",
                  "Technology Leadership",
                  "Startup Growth",
                  "Music Production",
                  "Songwriting",
                  "Vocal Techniques"
                ],
                "homeLocation": {
                  "@type": "Place",
                  "name": "Austin",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Austin",
                    "addressRegion": "TX",
                    "addressCountry": "US"
                  }
                },
                "sameAs": [
                  "https://github.com/jimmypocock",
                  "https://linkedin.com/in/jimmypocock",
                  "https://twitter.com/jimmypocock"
                ],
                "makesOffer": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "SoftwareApplication",
                      "name": "Vocal Technique Translator",
                      "applicationCategory": "Music Education"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "SoftwareApplication",
                      "name": "SongSnips",
                      "applicationCategory": "Music Production"
                    }
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://jimmypocock.com/#roverpass",
                "name": "RoverPass",
                "url": "https://roverpass.com",
                "founder": {
                  "@type": "Person",
                  "@id": "https://jimmypocock.com/#person"
                },
                "employee": {
                  "@type": "Person",
                  "@id": "https://jimmypocock.com/#person"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://jimmypocock.com/#website",
                "url": "https://jimmypocock.com",
                "name": "Jimmy Pocock - Personal Website",
                "description": "Personal website of Jimmy Pocock, Co-founder & CTO at RoverPass, tech leader and musician based in Austin, Texas",
                "publisher": {
                  "@type": "Person",
                  "@id": "https://jimmypocock.com/#person"
                },
                "inLanguage": "en-US",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://jimmypocock.com/thoughts?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": "https://jimmypocock.com/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://jimmypocock.com"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "dateCreated": "2024-01-01",
                "dateModified": new Date().toISOString(),
                "mainEntity": {
                  "@type": "Person",
                  "@id": "https://jimmypocock.com/#person"
                }
              }
            ])
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}