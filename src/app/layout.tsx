import type { Metadata } from "next";
import { Josefin_Sans, Inter, Azeret_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const PUBLISHED_AT = "2025-01-15T00:00:00-03:00";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeelo.site"),
  icons: {
    icon: "/images/logo-1x1-brand.png",
    shortcut: "/images/logo-1x1-brand.png",
    apple: "/images/logo-1x1-brand.png",
  },
  title: "Lista de Enxoval de Casa Nova Completa com +196 Itens | Zeelo",
  description:
    "Monte sua lista de enxoval de casa nova com +196 itens por cômodo, alertas de promoções em tempo real e controle financeiro. +3.550 famílias usam o Zeelo.",
  keywords: [
    "lista de enxoval de casa nova",
    "lista de enxoval",
    "enxoval de casa nova",
    "enxoval casa nova completo",
    "o que precisa para casa nova lista",
    "enxoval básico casa nova",
    "lista de enxoval completa",
    "como montar enxoval de casa nova",
    "quanto custa enxoval casa nova",
    "organizar enxoval",
    "enxoval de casamento",
    "enxoval novo lar",
    "planejamento de enxoval",
    "lista de compras casa nova",
    "controle de gastos enxoval",
    "promoções enxoval",
    "aplicativo enxoval",
    "enxoval completo por cômodo",
    "ferramenta para montar enxoval",
    "Zeelo enxoval",
  ],
  authors: [{ name: "Equipe Zeelo", url: "https://zeelo.site" }],
  creator: "Zeelo",
  publisher: "Zeelo",
  category: "lifestyle",
  alternates: {
    canonical: "https://zeelo.site",
    languages: {
      "pt-BR": "https://zeelo.site",
    },
  },
  openGraph: {
    title: "Lista de Enxoval de Casa Nova Completa com +196 Itens | Zeelo",
    description:
      "Monte sua lista de enxoval de casa nova com +196 itens por cômodo, alertas de promoções em tempo real e controle financeiro. +3.550 famílias usam o Zeelo.",
    type: "article",
    locale: "pt_BR",
    siteName: "Zeelo",
    url: "https://zeelo.site",
    publishedTime: PUBLISHED_AT,
    modifiedTime: new Date().toISOString(),
    authors: ["Equipe Zeelo"],
    section: "Enxoval de Casa Nova",
    tags: ["enxoval", "lista de enxoval", "casa nova", "casamento"],
    images: [
      {
        url: "/images/hero-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Zeelo — Lista de enxoval de casa nova com +196 itens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lista de Enxoval de Casa Nova Completa | Zeelo",
    description:
      "Lista de enxoval com +196 itens por cômodo, alertas de promoções e controle financeiro. +3.550 famílias já organizam com o Zeelo.",
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
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${josefinSans.variable} ${inter.variable} ${azeretMono.variable}`}
    >
      <head>
        {/* Preconnect to third-party origins used by analytics / pixels / checkout */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="" />
        <link rel="dns-prefetch" href="https://pay.cakto.com.br" />
        <link rel="dns-prefetch" href="https://app.zeelo.site" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload LCP hero image */}
        <link
          rel="preload"
          as="image"
          href="/images/dash.png"
          fetchPriority="high"
        />

        {/* Google Tag Manager — loads after page is interactive, non-blocking */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHS56BCL');`,
          }}
        />

        {/* Microsoft Clarity — loads after page is interactive, non-blocking */}
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","w95fm6ngvt");`,
          }}
        />

        {/* Utmify Pixel — lazy loaded, lowest priority */}
        <Script
          id="utmify-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.pixelId = "69d805fc7cf4c593612274c9";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);`,
          }}
        />
        {/* TikTok Pixel — lazy loaded, lowest priority */}
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.tikTokPixelId = "69e11e711d989946d946af85";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel-tiktok.js");
document.head.appendChild(a);`,
          }}
        />

        {/* Utmify UTM tracking — lazy loaded, lowest priority */}
        <Script
          id="utmify-utms"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          strategy="lazyOnload"
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NH8S0K1KHV"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-NH8S0K1KHV');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {/* Google Tag Manager (noscript) — fallback for JS-disabled browsers */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHS56BCL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
