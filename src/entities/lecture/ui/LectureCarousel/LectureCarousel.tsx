"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  UnifiedTooltip,
} from "@/shared/ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { LectureCard } from "../LectureCard";
import { LectureInfo } from "../../model/lecture";

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LectureCarouselProps {
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  lectureInfo: LectureInfo[];
  isPreviousIcon?: boolean;
  isNextIcon?: boolean;
}

const LectureCarousel = ({
  setApi,
  lectureInfo,
  isPreviousIcon,
  isNextIcon,
}: LectureCarouselProps) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>();
  const [windowInnerWidth, setWindowInnerWidth] = useState<string>();

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      // desktop
      setWindowInnerWidth("desktop");
    } else if (width >= 768) {
      // tablet
      setWindowInnerWidth("tablet");
    } else {
      // mobile
      setWindowInnerWidth("mobile");
    }
  };

  const tooltipContent = () => {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[30px] px-3 py-2 bg-custom-homeTooltipBackground rounded-sm relative">
        <div className="absolute top-[-3.5px] left-4">
          <Image
            src="/images/kakao_tooltip_arrow.png"
            alt="tooltip arrow"
            width={7}
            height={7}
            className="bg-custom-homeTooltipBackground rotate-45"
          />
        </div>
        <div className="font-normal text-sm text-white">
          카드를 옆으로 넘겨보세요!
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel
      setApi={setApi}
      className="flex items-center justify-start w-full overflow-hidden"
    >
      {/* FIXME: 툴팁 처리 수경, 지희님 확인 필요 */}
      {windowInnerWidth === "mobile" ? (
        <UnifiedTooltip
          triggerItem={
            <CarouselContent className="desktop:gap-6 tablet:gap-4 mobile:gap-3 pb-[20px]">
              {lectureInfo.map((lectureData) => {
                return (
                  <CarouselItem
                    key={lectureData.id}
                    className="desktop:basis-[384px] tablet:basis-[280px] mobile:basis-[240px]"
                  >
                    <LectureCard
                      key={lectureData.id}
                      lectureData={lectureData}
                      type="homeLecture"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          }
          side="bottom"
          sideOffset={-40}
          align="start"
          alignOffset={32}
          open={openTooltip}
          onOpenChange={setOpenTooltip}
          defaultOpen
          tooltipContent={tooltipContent()}
          contentClassName="bg-custom-white px-0 pt-2"
        />
      ) : (
        <CarouselContent className="desktop:gap-6 tablet:gap-4 mobile:gap-3 pb-[20px]">
          {lectureInfo.map((lectureData) => {
            return (
              <CarouselItem
                key={lectureData.id}
                className="desktop:basis-[384px] tablet:basis-[280px] mobile:basis-[240px]"
              >
                <LectureCard
                  key={lectureData.id}
                  lectureData={lectureData}
                  type="homeLecture"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      )}
      {isPreviousIcon && (
        <CarouselPrevious
          variant="ghost"
          className="desktop:ml-[30px] tablet:ml-8 mobile:ml-2 w-16 h-16 bg-black hover:bg-black opacity-50 hover:opacity-70 disabled:opacity-20"
        />
      )}
      {isNextIcon && (
        <CarouselNext
          variant="ghost"
          className="desktop:mr-[30px] tablet:mr-8 w-16 h-16 bg-black hover:bg-black opacity-50 hover:opacity-70 disabled:opacity-20"
        />
      )}
    </Carousel>
  );
};

export default LectureCarousel;
