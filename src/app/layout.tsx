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
  title: "Zeelo - Organize e Monte o Enxoval dos Sonhos Pagando Barato",
  description:
    "Organize seu enxoval de forma prática e inteligente. Acompanhe promoções, controle financeiro e planeje cada cômodo do seu novo lar em um só lugar. Acesso vitalício por apenas R$47,90.",
  keywords: [
    "enxoval",
    "lista de enxoval",
    "organizar enxoval",
    "enxoval de casamento",
    "enxoval novo lar",
    "planejamento de enxoval",
    "lista de compras casa",
    "decoração",
    "mudança",
    "novo lar",
  ],
  openGraph: {
    title: "Zeelo - Organize e Monte o Enxoval dos Sonhos",
    description:
      "Organize seu enxoval de forma prática e inteligente. Promoções 24/7, controle financeiro e planejamento por cômodos.",
    type: "website",
    locale: "pt_BR",
    siteName: "Zeelo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeelo - Organize e Monte o Enxoval dos Sonhos",
    description:
      "Organize seu enxoval de forma prática e inteligente. Promoções 24/7, controle financeiro e planejamento por cômodos.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
