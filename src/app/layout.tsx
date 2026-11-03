import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Empire Times | Essential Stories. Real Impact.",
    template: "%s | The Empire Times",
  },
  description:
    "Independent global journalism delivering rigorous, analytical reporting across American politics, technology, markets, world affairs, culture, and science.",
  applicationName: "The Empire Times",
  authors: [{ name: "The Empire Times Staff", url: `${siteUrl}/author/empire-times-staff` }],
  generator: "Next.js",
  keywords: [
    "The Empire Times",
    "Breaking News",
    "US News",
    "Politics",
    "Investigative Journalism",
    "White House",
    "Wall Street",
    "Financial Markets",
    "Artificial Intelligence",
    "Technology News",
    "World Affairs",
    "Special Reports",
    "Alina Habba",
    "Herrera Velutini",
  ],
  creator: "The Empire Times Editorial Bureau",
  publisher: "The Empire Times Media Group Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Empire Times",
    title: "The Empire Times | Essential Stories. Real Impact.",
    description:
      "Independent global journalism delivering rigorous reporting across American politics, technology, markets, and world affairs.",
    images: [
      {
        url: "/uploads/news/alina-habba-main.jpg",
        width: 1200,
        height: 675,
        alt: "The Empire Times - Modern News Publication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theempiretimes",
    creator: "@theempiretimes",
    title: "The Empire Times | Essential Stories. Real Impact.",
    description:
      "Independent global journalism delivering rigorous reporting across American politics, technology, markets, and world affairs.",
    images: ["/uploads/news/alina-habba-main.jpg"],
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
  verification: {
    google: "-RPkNiwzCpI8UAHJlzlQaZ-ciSAHYZNx--rj9HUf-J4",
  },
  category: "news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "The Empire Times",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/uploads/news/alina-habba-main.jpg`,
          width: 1200,
          height: 675,
        },
        sameAs: [
          "https://twitter.com/theempiretimes",
        ],
        publishingPrinciples: `${siteUrl}/about`,
        ethicsPolicy: `${siteUrl}/about`,
        diversityPolicy: `${siteUrl}/about`,
        correctionsPolicy: `${siteUrl}/about`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "The Empire Times",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/latest?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="google-site-verification" content="-RPkNiwzCpI8UAHJlzlQaZ-ciSAHYZNx--rj9HUf-J4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
