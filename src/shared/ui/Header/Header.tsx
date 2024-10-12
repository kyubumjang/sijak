"use client";

import { HeaderFeatures, HeaderPrevious, HeaderTitle } from ".";

import { HeaderDescription } from "./HeaderDescription";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <div className="flex desktop:justify-between w-full tablet:justify-between items-center desktop:max-w-[1440px] tablet:max-w-[1440px] mobile:max-w-[768px] desktop:h-[70px] tablet:h-[70px] mobile:h-12 desktop:px-[120px] tablet:px-6 mobile:px-6 desktop:gap-2 tablet:gap-2 fixed top-0 bg-white z-10 ">
      <div className="flex flex-row w-full gap-5">
        <Logo />
        <HeaderPrevious />
        <HeaderDescription />
      </div>
      <HeaderTitle />
      <HeaderFeatures />
    </div>
  );
};

export default Header;
