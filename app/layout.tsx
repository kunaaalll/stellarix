import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Rajdhani } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const rajdhani = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://stellarix.vision";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stellarix | Elaris Precision Optics — Luxury Lenses & Advanced Coatings",
    template: "%s | Stellarix",
  },
  description:
    "Elaris by Stellarix — refined vision perfected through 60 years of optical mastery and Japanese innovation. Premium precision lenses with BLI+ blue light filtering, hydrophobic coatings, and camera-ready anti-glare technology.",
  keywords: [
    "Elaris", "Stellarix", "precision lenses", "luxury eyewear", "optical coatings",
    "BLI+ blue light filtering", "anti-reflective lenses", "hydrophobic lens coating",
    "night driving lenses", "scratch resistant lenses", "premium optics",
    "Japanese optical innovation", "camera ready anti-glare",
  ],
  authors: [{ name: "Stellarix" }],
  creator: "Stellarix",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Stellarix",
    title: "Stellarix | Elaris Precision Optics",
    description: "Elaris — refined vision perfected through 60 years of optical mastery and Japanese innovation. Discover precision lenses with advanced multi-layer coatings.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Elaris Precision Optics by Stellarix — luxury lenses with advanced coatings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellarix | Elaris Precision Optics",
    description: "Elaris — refined vision perfected through 60 years of optical mastery and Japanese innovation.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${rajdhani.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('stellarix-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Stellarix",
                  url: siteUrl,
                  logo: `${siteUrl}/og-image.jpg`,
                  sameAs: [],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "hello@stellarix.com",
                    contactType: "customer service",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Stellarix",
                  description: "Elaris precision optics — luxury lenses with advanced multi-layer coatings.",
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
                {
                  "@type": "Brand",
                  name: "Elaris",
                  description: "Refined vision perfected through 60 years of optical mastery and Japanese innovation.",
                  url: siteUrl,
                },
                {
                  "@type": "ProductCollection",
                  name: "Elaris Lens Series",
                  description: "Four tiers of precision optics — each building on the last.",
                  url: `${siteUrl}/#elaris-series`,
                  brand: { "@type": "Brand", name: "Elaris" },
                  numberOfItems: 4,
                  itemListElement: [
                    {
                      "@type": "Product",
                      name: "Elaris",
                      description: "The essential foundation of precision optics with hydrophobic shield, double aspheric design, and BLI+ blue light filtering.",
                      brand: { "@type": "Brand", name: "Elaris" },
                      category: "Optical Lenses",
                    },
                    {
                      "@type": "Product",
                      name: "Elaris Clear",
                      description: "Ultra-transparent optics with camera-ready clarity and anti-glare technology.",
                      brand: { "@type": "Brand", name: "Elaris" },
                      category: "Optical Lenses",
                    },
                    {
                      "@type": "Product",
                      name: "Elaris Drive",
                      description: "Engineered for confident night-time driving with NightDrive coating reducing headlight glare by up to 65%.",
                      brand: { "@type": "Brand", name: "Elaris" },
                      category: "Optical Lenses",
                    },
                    {
                      "@type": "Product",
                      name: "Elaris Fusion",
                      description: "Maximum durability meets optical excellence with extreme scratch shield — up to 75% more scratch-resistant.",
                      brand: { "@type": "Brand", name: "Elaris" },
                      category: "Optical Lenses",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
