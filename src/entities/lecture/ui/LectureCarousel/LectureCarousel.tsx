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
import { Dispatch, SetStateAction, useState } from "react";

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
  const [openTooltip, setOpenTooltip] = useState<boolean>(true);

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
        <div className="font-bold text-sm text-white">
          카드를 옆으로 넘겨보세요!
        </div>
      </div>
    );
  };
  return (
    <Carousel
      setApi={setApi}
      className="flex items-center justify-start w-full"
    >
      <CarouselContent className="desktop:gap-6 tablet:gap-4 mobile:gap-3 pb-[20px]">
        {lectureInfo.map((lectureData, idx) => {
          return idx === 0 ? (
            <UnifiedTooltip
              key={lectureData.id}
              triggerItem={
                <CarouselItem className="desktop:basis-[384px] tablet:basis-[280px] mobile:basis-[240px]">
                  <LectureCard
                    key={lectureData.id}
                    lectureData={lectureData}
                    type="homeLecture"
                  />
                </CarouselItem>
              }
              side="bottom"
              sideOffset={-18}
              align="start"
              alignOffset={32}
              open={openTooltip}
              onOpenChange={setOpenTooltip}
              defaultOpen
              tooltipContent={tooltipContent()}
              contentClassName="bg-custom-white px-0 pt-2"
            />
          ) : (
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
      {isPreviousIcon && (
        <CarouselPrevious
          variant="ghost"
          className="hover:bg-transparent desktop:ml-[30px] tablet:ml-8 w-16 h-16"
        />
      )}
      {isNextIcon && (
        <CarouselNext
          variant="ghost"
          className="hover:bg-transparent desktop:mr-[30px] tablet:mr-8 w-16 h-16"
        />
      )}
    </Carousel>
  );
};

export default LectureCarousel;
