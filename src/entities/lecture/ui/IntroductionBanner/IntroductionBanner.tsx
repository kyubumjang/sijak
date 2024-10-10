import Link from "next/link";

const IntroductionBanner = () => {
  return (
    <Link
      href="https://ebony-specialist-cf1.notion.site/f34337d192d54efd818663cbeb2ad77c?pvs=4"
      target="_blank"
    >
      <div className="flex flex-col items-start justify-center desktop:pt-[43px] desktop:pb-[35px] desktop:pl-[108px] tablet:pt-[25px] tablet:pb-[26px] tablet:pl-[60px] mobile:pt-[25px] mobile:pb-[26px] mobile:pl-[29px] bg-custom-bannerBackground">
        <div className="flex flex-col gap-2">
          <div className="flex desktop:flex-row tablet:flex-col mobile:flex-col desktop:gap-1">
            <div className="flex flex-row">
              <div className="desktop:text-3xl tablet:text-lg mobile:text-lg font-bold">
                시ː작
              </div>
              <div className="desktop:text-3xl tablet:text-lg mobile:text-lg">
                을 통하면
              </div>
            </div>
            <div className="desktop:text-3xl tablet:text-lg mobile:text-lg">
              새로운 일상의
            </div>
            <div className="desktop:text-3xl tablet:text-lg mobile:text-lg">
              반은 왔어요
            </div>
          </div>
          <div className="desktop:text-xl tablet:text-sm mobile:text-sm desktop:font-normal tablet:font-bold mobile:font-bold">
            시작이 반이다!
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IntroductionBanner;
