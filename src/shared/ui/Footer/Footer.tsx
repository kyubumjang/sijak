"use client";

import { ExternalLink } from "../ExternalLink";
import { ExternalLinkProps } from "../ExternalLink/ExternalLink";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const externalLinkList: Array<ExternalLinkProps> = [
  {
    link: "https://www.notion.so/6d012c4a80f845eca3d98defc11d6d86?pvs=4",
    content: "개인정보처리방침",
  },
  {
    link: "https://www.notion.so/b942a4f9070442b7891cb136037ffa74?pvs=4",
    content: "이용약관",
  },
  {
    link: "https://www.notion.so/17e92e6c1188429cb17ad92d84f65103?pvs=4",
    content: "위치기반시스템이용약관",
  },
  {
    link: "https://www.notion.so/f34337d192d54efd818663cbeb2ad77c?pvs=4",
    content: "서비스가이드",
  },
];

const Footer = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const isRenderFooter = () => {
    if (url !== "login" && url !== "class" && url !== "signup") {
      return true;
    }
    return false;
  };

  return (
    isRenderFooter() && (
      <div className="flex justify-between w-full h-[208px] bg-custom-footerBackground desktop:px-[120px] tablet:px-8 mobile:px-6 pt-[62px] border-t max-w-[1440px] mx-auto my-0 mobile:gap-4">
        <div className="flex flex-row items-center justify-center h-[42px] gap-[10px] text-custom-textDescriptionGrayColor">
          <div>
            <Image
              src="/images/sijak_footer_logo.png"
              alt="sijak footer logo"
              width={42}
              height={42}
            />
          </div>
          <div className="flex flex-col gap-0">
            <div className="text-sm text-custom-textFooterColor font-medium">
              시ː작이 반이다.
            </div>
            <div className="text-sm text-custom-textFooterColor font-medium">
              모든 여정은 한 걸음에서 시작됩니다.
            </div>
          </div>
        </div>
        <div className="flex mb-10 desktop:gap-10 tablet:gap-2 mobile:gap-1 desktop:flex-row tablet:flex-col mobile:flex-col text-custom-textDescriptionGrayColor text-sm font-medium">
          {externalLinkList.map((externalLink) => {
            return (
              <div key={externalLink.content}>
                <ExternalLink
                  link={externalLink.link}
                  content={externalLink.content}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Footer;
