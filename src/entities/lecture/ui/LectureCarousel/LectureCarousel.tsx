import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent className="desktop:gap-6 tablet:gap-4 mobile:gap-3">
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
