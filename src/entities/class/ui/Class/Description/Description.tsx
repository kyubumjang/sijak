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
    <div className="flex w-full flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full h-full">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="h-[640px] object-contain overflow-hidden mobile:object-cover"
                      src="/images/senior.png"
                      alt="senior"
                      width={1440}
                      height={640}
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="w-[1440px] h-[640px] object-contain overflow-hidden mobile:object-cover"
                      src="/images/sijak_happy.png"
                      alt="sijak_happy"
                      width={1440}
                      height={640}
                      priority
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      className="w-[1440px] h-[640px] object-contain overflow-hidden mobile:object-cover"
                      src="/images/sijak_position.png"
                      alt="sijak_position"
                      width={1440}
                      height={640}
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
