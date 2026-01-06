import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import StructuredData from "@/components/blog/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "albatro33 blog",
    template: "%s | albatro33 blog",
  },
  description: "개발, 기술, 그리고 일상 이야기를 공유하는 블로그",
  keywords: ["개발", "프로그래밍", "블로그", "Next.js", "React", "TypeScript", "웹개발", "albatro33"],
  authors: [{ name: "albatro33" }],
  creator: "albatro33",
  publisher: "albatro33",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://albatro33.github.io",
    siteName: "albatro33 blog",
    title: "albatro33 blog",
    description: "개발, 기술, 그리고 일상 이야기를 공유하는 블로그",
    images: [
      {
        url: "https://albatro33.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "albatro33 blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "albatro33 blog",
    description: "개발, 기술, 그리고 일상 이야기를 공유하는 블로그",
    images: ["https://albatro33.github.io/og-image.png"],
    creator: "@albatro33",
  },
  verification: {
    google: "google-site-verification-code", // Google Search Console에서 받은 코드로 교체
  },
  alternates: {
    canonical: "https://albatro33.github.io",
  },
  other: {
    'google-adsense-account': 'ca-pub-8449097414793908',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <StructuredData type="blog" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
