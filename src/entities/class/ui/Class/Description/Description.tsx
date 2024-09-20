"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
} from "../../../../../shared/ui";
import { useEffect, useState } from "react";

import Image from "next/image";

const Description = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex w-full flex-col justify-center items-center mb-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full h-[498px]">
            <Carousel
              setApi={setApi}
              className="w-full max-w-[1200px] h-[534px]"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="w-[1200px] h-[498px] object-contain overflow-hidden"
                      src="/images/one_day.png"
                      alt="one_day_class"
                      width={1200}
                      height={498}
                      priority
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="w-[1200px] h-[498px] object-contain overflow-hidden"
                      src="/images/free_ticket.png"
                      alt="free_ticket"
                      width={1200}
                      height={498}
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="w-[1200px] h-[498px] object-contain overflow-hidden"
                      src="/images/sports_plan.png"
                      alt="sports_plan"
                      width={1200}
                      height={498}
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="flex justify-start items-center w-[153px] h-[24px] gap-3">
            <div className="text-sm text-muted-foreground font-bold">
              {current}
            </div>
            <Progress value={current === count ? 100 : current * 33} />
            <div className="text-sm text-muted-foreground ">{count}</div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center items-center gap-2">
          <div className="text-gray-700 text-2xl">
            시니어를 위한 새로운 시작,
          </div>
          <div className="text-gray-900 font-bold text-3xl">
            내 주변 다양한 문화클래스를 한눈에 확인하세요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
