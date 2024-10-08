"use client";

import { ExternalLink } from "../ExternalLink";
import { ExternalLinkProps } from "../ExternalLink/ExternalLink";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const isRenderFooter = () => {
    if (url !== "login" && url !== "class" && url !== "signup") {
      return true;
    }
    return false;
  };

  const externalLinkList: Array<ExternalLinkProps> = [
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
  ];

  return (
    isRenderFooter() && (
      <div className="flex justify-between w-full h-[208px] bg-custom-footerBackground desktop:px-[120px] tablet:px-8 mobile:px-6 pt-[62px] border-t">
        <div className="flex flex-row items-center justify-center w-[140px] h-[36px] gap-[7px] text-custom-textDescriptionGrayColor">
          <div className="">
            <Image
              src="/images/sijak_footer_logo.png"
              alt="sijak footer logo"
              width={36}
              height={36}
            />
          </div>
          <div className="flex flex-col gap-0">
            <div className="text-[6px] font-medium">시ː작이 반이다.</div>
            <div className="text-[6px] font-medium">
              모든 여정은 한 걸음에서 시작됩니다.
            </div>
          </div>
        </div>
        <div className="flex mb-10 desktop:gap-10 tablet:gap-10 mobile:gap-1 desktop:flex-row tablet:flex-row mobile:flex-col text-custom-textDescriptionGrayColor text-[10px]">
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
