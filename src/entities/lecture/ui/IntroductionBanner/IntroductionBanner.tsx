"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const IntroductionBanner = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let src;
  let width;
  let height;

  if (windowWidth < 400) {
    src = "/images/sub_banner_mobile.png";
    width = 312;
    height = 156;
  } else if (windowWidth < 768) {
    src = "/images/sub_banner_tablet.png";
    width = 704;
    height = 156;
  } else {
    src = "/images/sub_banner_web.png";
    width = 1200;
    height = 200;
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <Link
        href="https://ebony-specialist-cf1.notion.site/f34337d192d54efd818663cbeb2ad77c?pvs=4"
        target="_blank"
      >
        <Image src={src} alt="sub banner" width={width} height={height} />
      </Link>
    </div>
  );
};

export default IntroductionBanner;
