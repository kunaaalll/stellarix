import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Rajdhani } from "next/font/google";
import "@/styles/globals.css";

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

const siteUrl = "https://stellarix.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stellarix | Elaris Precision Optics",
    template: "%s | Stellarix",
  },
  description:
    "Elaris — refined vision perfected through 60 years of optical mastery and Japanese innovation. Discover precision lenses with advanced multi-layer coatings by Stellarix.",
  keywords: ["Elaris", "precision lenses", "optical coatings", "luxury eyewear", "Stellarix", "BLI+ blue light", "LumiGuard", "anti-reflective lenses"],
  authors: [{ name: "Stellarix" }],
  creator: "Stellarix",
  openGraph: {
    type: "website",
    locale: "en",
    url: siteUrl,
    siteName: "Stellarix",
    title: "Stellarix | Elaris Precision Optics",
    description: "Elaris — refined vision perfected through 60 years of optical mastery and Japanese innovation.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Elaris Precision Optics by Stellarix" }],
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
  robots: {
    index: true,
    follow: true,
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
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Stellarix",
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
