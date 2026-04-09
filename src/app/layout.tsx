import type { Metadata } from "next";
import { Josefin_Sans, Inter, Azeret_Mono } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body",
  display: "swap",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-mono",
  display: "swap",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
