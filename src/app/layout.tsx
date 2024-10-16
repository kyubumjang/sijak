import "./globals.css";

import { Footer, Header, ToastToaster, Toaster } from "@/shared/ui";

import { GoogleAnalytics } from "@next/third-parties/google";
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
  description: "시니어를 위한 문화생활 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID}&submodules=geocoder`}
        />
      </head>
      <body className={`${pretendard.variable} flex flex-col w-full h-full`}>
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
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID ?? ""}
      />
    </html>
  );
}
