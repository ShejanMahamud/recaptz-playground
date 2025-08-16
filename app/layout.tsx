import { AnalyticsProvider } from "@/components/analytics";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://recaptz.vercel.app"),
  title: {
    default: "ReCAPTZ - Modern React CAPTCHA Component | Secure & Accessible",
    template: "%s | ReCAPTZ",
  },
  description:
    "ReCAPTZ is a modern, secure, and accessible CAPTCHA component for React applications. Features multiple verification types, dark mode, RTL support, and zero dependencies.",
  keywords: [
    "react captcha",
    "captcha component",
    "react security",
    "form validation",
    "accessibility captcha",
    "typescript captcha",
    "nextjs captcha",
    "modern captcha",
    "secure captcha",
    "customizable captcha",
    "zero dependencies",
    "dark mode captcha",
    "rtl captcha",
    "audio captcha",
    "confetti animation",
    "react 19",
    "next.js 15",
  ],
  authors: [
    {
      name: "Shejan Mahamud",
      url: "https://github.com/ShejanMahamud",
    },
  ],
  creator: "Shejan Mahamud",
  publisher: "ReCAPTZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recaptz.vercel.app",
    siteName: "ReCAPTZ",
    title: "ReCAPTZ - Modern React CAPTCHA Component",
    description:
      "Secure, accessible, and customizable CAPTCHA component for React applications with TypeScript support, dark mode, RTL, and zero dependencies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReCAPTZ - Modern React CAPTCHA Component",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "ReCAPTZ Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@recaptz",
    creator: "@shejanmahamud",
    title: "ReCAPTZ - Modern React CAPTCHA Component",
    description:
      "Secure, accessible, and customizable CAPTCHA component for React applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Software Development Tools",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://recaptz.vercel.app",
    languages: {
      "en-US": "https://recaptz.vercel.app",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <meta name="google-adsense-account" content="ca-pub-1826178787116871" />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-6ZKXLP1TX5`}
        />
        {/*
        Google Adsense
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1826178787116871"
          crossorigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6ZKXLP1TX5', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://recaptz.vercel.app/",
                  url: "https://recaptz.vercel.app/",
                  name: "ReCAPTZ",
                  description: "Modern React CAPTCHA Component",
                  publisher: {
                    "@id": "https://github.com/recaptz",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate:
                          "https://recaptz.vercel.app/?s={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
                {
                  "@type": "Organization",
                  "@id": "https://github.com/recaptz",
                  name: "ReCAPTZ",
                  url: "https://recaptz.vercel.app/",
                  logo: {
                    "@type": "ImageObject",
                    inLanguage: "en-US",
                    "@id": "https://recaptz.vercel.app/#/schema/logo/image/",
                    url: "https://recaptz.vercel.app/logo.png",
                    contentUrl: "https://recaptz.vercel.app/logo.png",
                    width: 512,
                    height: 512,
                    caption: "ReCAPTZ",
                  },
                  image: {
                    "@id": "https://recaptz.vercel.app/#/schema/logo/image/",
                  },
                  sameAs: [
                    "https://github.com/ShejanMahamud/recaptz",
                    "https://www.npmjs.com/package/recaptz",
                  ],
                },
                {
                  "@type": "WebPage",
                  "@id": "https://recaptz.vercel.app/",
                  url: "https://recaptz.vercel.app/",
                  name: "ReCAPTZ - Modern React CAPTCHA Component | Secure & Accessible",
                  isPartOf: {
                    "@id": "https://recaptz.vercel.app/",
                  },
                  about: {
                    "@id": "https://recaptz.vercel.app/",
                  },
                  description:
                    "ReCAPTZ is a modern, secure, and accessible CAPTCHA component for React applications. Features multiple verification types, dark mode, RTL support, and zero dependencies.",
                  inLanguage: "en-US",
                  potentialAction: [
                    {
                      "@type": "ReadAction",
                      target: ["https://recaptz.vercel.app/"],
                    },
                  ],
                },
                {
                  "@type": "SoftwareApplication",
                  name: "ReCAPTZ",
                  description:
                    "Modern, secure, and accessible CAPTCHA component for React applications",
                  url: "https://recaptz.vercel.app/",
                  downloadUrl: "https://www.npmjs.com/package/recaptz",
                  softwareVersion: "1.0.0",
                  operatingSystem: "Web Browser",
                  applicationCategory: "DeveloperApplication",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  author: {
                    "@type": "Person",
                    name: "Shejan Mahamud",
                    url: "https://github.com/ShejanMahamud",
                  },
                  programmingLanguage: [
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                  ],
                  runtimePlatform: ["Node.js", "Web Browser"],
                  requirements: "React 18+, TypeScript (optional)",
                  featureList: [
                    "Multiple CAPTCHA types (numbers, letters, mixed, custom)",
                    "Accessibility support with audio feedback",
                    "Dark mode and RTL language support",
                    "Zero external dependencies",
                    "TypeScript support",
                    "Customizable validation rules",
                    "Confetti animations",
                    "Form integration examples",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AnalyticsProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
