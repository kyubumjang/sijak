"use client";

import Link from "next/link";
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

  return (
    isRenderFooter() && (
      <div className="w-full h-[162px] bg-[#E5E5E5] px-20 py-5 text-gray-600 border-t">
        <div>
          <div className="flex mb-10 gap-2 desktop:flex-row tablet:flex-row mobile:flex-col">
            {/* TODO: URL ENV 처리 필요한지 확인: 공유 페이지라 괜찮을 것 같지만 확인 필요 */}
            <Link
              href="https://ebony-specialist-cf1.notion.site/59f05d08d90346ad989223480f372c84?pvs=4"
              target="_blank"
            >
              개인정보처리방침 |
            </Link>
            <Link
              href="https://ebony-specialist-cf1.notion.site/a46bfe06464b4101927da295479d4576?pvs=4"
              target="_blank"
            >
              이용약관 |
            </Link>
            {/* TODO: 카카오톡 오픈채팅 연결 */}
            <Link href="" target="_blank">
              위치기반시스템이용약관 |
            </Link>
            <Link
              href="https://ebony-specialist-cf1.notion.site/15d15238629640f8a3ed6e1fc289eb86?pvs=4"
              target="_blank"
            >
              서비스가이드
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
