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

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo-1x1-brand.png",
    shortcut: "/images/logo-1x1-brand.png",
    apple: "/images/logo-1x1-brand.png",
  },
  title: "Zeelo – Como Montar Enxoval de Casa Nova com Inteligência e Economia",
  description:
    "Chega de lista de enxoval em PDF e planilha manual. O Zeelo organiza todo o enxoval da sua casa nova: lista completa com +196 itens, alertas de promoções em tempo real, controle financeiro e colaboração em casal. Mais de 3.550 famílias já usam.",
  keywords: [
    "como montar enxoval de casa nova",
    "lista de enxoval completa",
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
  alternates: {
    canonical: "https://zeelo.site",
  },
  openGraph: {
    title: "Zeelo – Como Montar Enxoval de Casa Nova com Inteligência e Economia",
    description:
      "Chega de lista em PDF. Organize o enxoval do seu novo lar com alertas de promoções em tempo real, controle financeiro e mais de 196 itens prontos. Mais de 3.550 famílias já usam o Zeelo.",
    type: "website",
    locale: "pt_BR",
    siteName: "Zeelo",
    url: "https://zeelo.site",
    images: [
      {
        url: "/images/hero-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Zeelo - Plataforma de organização de enxoval de casa nova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeelo – Como Montar Enxoval de Casa Nova com Inteligência",
    description:
      "Chega de lista em PDF. Organize o enxoval do seu novo lar com alertas de promoções, controle financeiro e +196 itens. Mais de 3.550 famílias organizadas.",
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
