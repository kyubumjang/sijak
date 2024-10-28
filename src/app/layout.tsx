import "./globals.css";

import { Footer, Header, ToastToaster, Toaster } from "@/shared/ui";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Providers from "@/features/provider/Provider";
import Script from "next/script";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "시작",
  description: "주변의 기회를 찾다, 시니어를 위한 맞춤형 프로그램",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <head>
        <meta
          name="naver-site-verification"
          content={
            process.env.NEXT_PUBLIC_NAVER_SEARCH_ADVISOR_SITE_VERIFICATION_ID
          }
        />
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID}&submodules=geocoder`}
        />
      </head>
      <body className={`${pretendard.className} flex flex-col w-full h-full`}>
        <Providers>
          <main className="flex w-full h-full flex-1">
            <div className="flex flex-col w-full h-full justify-start items-start relative">
              <div className="flex flex-col w-full h-full justify-start items-start relative max-w-[1440px] mx-auto my-0">
                <Header />
                <div className="flex flex-col w-full h-full justify-start items-start desktop:pt-[70px] tablet:pt-[70px] mobile:pt-12">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <Toaster />
          <ToastToaster />
        </Providers>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_GTM_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_GTM_ID}
        />
      )}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID && (
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID}
        />
      )}
      <Analytics />
    </html>
  );
}
