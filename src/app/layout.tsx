import type { Metadata, Viewport } from "next";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import OfflineStatus from "@/components/OfflineStatus";
import TelegramMiniApp from "@/components/TelegramMiniApp";
import "./globals.css";
import "./chrome.css";
import "./theme.css";
import { SITE_URL } from "@/lib/site";

const site = SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(site),
  applicationName: "Goldfinder",
  category: "education",
  creator: "Goldfinder Project",
  publisher: "Goldfinder Project",
  title: {
    default: "探金 Goldfinder — 可验证的野外地质知识与取样工具",
    template: "%s | 探金 Goldfinder",
  },
  description:
    "用真实图片、地质证据、代表性取样、QA/QC、地图与现场记录，科学判断沙金和山金线索。",
  keywords: [
    "探金",
    "沙金",
    "山金",
    "砂金取样",
    "黄金地质",
    "矿物图鉴",
    "野外地质",
    "QA/QC",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Goldfinder",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: [{ url: "/images/gold-native.jpg", sizes: "960x960", type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: site,
    siteName: "Goldfinder",
    title: "探金 Goldfinder",
    description: "真实图片、地质证据与可验证取样组成的野外探金知识平台。",
    images: [
      {
        url: "/images/gold-native.jpg",
        width: 1200,
        height: 900,
        alt: "石英标本上的自然金颗粒",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "探金 Goldfinder",
    description: "以证据、取样和 QA/QC 支持野外黄金地质判断。",
    images: ["/images/gold-native.jpg"],
  },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0f12" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1e9" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      name: "Goldfinder",
      alternateName: ["探金", "ရွှေရှာဖွေ"],
      url: site,
      inLanguage: ["zh-CN", "en", "my"],
      description:
        "Evidence-led field geology, mineral recognition, sampling and record tools.",
      publisher: { "@id": `${site}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "Goldfinder Project",
      url: site,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site}/#application`,
      name: "Goldfinder Field Toolkit",
      url: site,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any web browser",
      isAccessibleForFree: true,
      availableLanguage: ["Chinese", "English", "Burmese"],
      featureList: [
        "Real-photo mineral reference atlas",
        "Placer and lode field-evidence scoring",
        "Placer g/m³ and lode ppm to g/t calculations",
        "Device-local sample records, mapping, reports and QA/QC",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "LearningResource",
      "@id": `${site}/#knowledge`,
      name: "Goldfinder illustrated field knowledge base",
      url: `${site}/knowledge`,
      educationalUse: "Field geology education",
      learningResourceType: "Reference guide",
      inLanguage: ["zh-CN", "en", "my"],
      isPartOf: { "@id": `${site}/#website` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js?63"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
        />
        <SiteNav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <OfflineStatus />
        <TelegramMiniApp />
      </body>
    </html>
  );
}
