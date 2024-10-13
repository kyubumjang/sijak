"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const [isVisible, setIsVisible] = useState(true);

  // FIXME: entire 모바일 로고 보이는 버그 픽스
  useEffect(() => {
    const handleResize = () => {
      const shouldHide =
        window.innerWidth < 768 &&
        (url === "class" ||
          url === "user" ||
          url === "like" ||
          url === "entire");

      setIsVisible(!shouldHide);
    };

    handleResize(); // 초기 확인
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [url]);

  if (!isVisible) {
    return null; // 로고가 보이지 않을 경우 null 반환
  }

  return (
    <div className="flex flex-col justify-center items-center desktop:w-[94px] desktop:h-[70px] desktop:min-w-[94px] desktop:min-h-[70px] tablet:w-[94px] tablet:h-[70px] tablet:min-w-[94px] tablet:min-h-[70px] mobile:w-[57px] mobile:h-[48px] mobile:min-w-[57px] mobile:min-h-[48px]">
      <Link href="/">
        <Image
          src="/icons/sijak_logo.svg"
          alt="sijak_logo"
          width={75}
          height={51}
        />
      </Link>
    </div>
  );
};

export default Logo;
