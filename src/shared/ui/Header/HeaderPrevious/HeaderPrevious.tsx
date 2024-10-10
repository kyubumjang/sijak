"use client";

import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";

const HeaderPrevious = () => {
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname.split("/")[1];

  const isRenderMobileArrow = () => {
    if (
      url === "class" ||
      url === "user" ||
      url === "like" ||
      url === "entire"
    ) {
      return true;
    }
    return false;
  };

  const backToPreviousPage = () => {
    router.back();
  };

  return (
    isRenderMobileArrow() && (
      <div className="desktop:hidden tablet:hidden mobile:flex justify-center items-center">
        <div onClick={backToPreviousPage}>
          <Image
            src="/icons/back_arrow_left.svg"
            alt="back"
            width={24}
            height={24}
          />
        </div>
      </div>
    )
  );
};

export default HeaderPrevious;
