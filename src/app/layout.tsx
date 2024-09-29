import "./globals.css";

import { Footer, Header, Toaster } from "@/shared/ui";

import Initializer from "@/mocks/Initializer";
import type { Metadata } from "next";
import Providers from "@/features/provider/Provider";
import Script from "next/script";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
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
      <body
        className={`${pretendard.variable} ${pretendard.variable} flex flex-col w-full h-full`}
      >
        <Providers>
          <main className="flex w-full h-full flex-1">
            <div className="flex flex-col w-full h-full justify-start items-start relative">
              <div className="flex flex-col w-full h-full justify-start items-start relative">
                <Header />
                <div className="flex flex-col w-full h-full justify-start items-start pt-16">
                  {children}
                </div>
                <Initializer />
              </div>
            </div>
          </main>
          {/* FIXME: footer 하단 고정 필요 */}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
