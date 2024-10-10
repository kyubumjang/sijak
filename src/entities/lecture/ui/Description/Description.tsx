"use client";

import { CarouselApi, ImageCarousel } from "../../../../shared/ui";

import { CarouselImage } from "@/shared/ui/ImageCarousel/ImageCarousel";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";
import { useState } from "react";

const Description = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { current, count } = useCarouselApi(api);

  const descriptionImages: CarouselImage[] = [
    {
      src: "/images/main_banner_1.png",
      alt: "senior",
      width: 1440,
      height: 640,
    },
    {
      src: "/images/main_banner_2.png",
      alt: "sijak_happy",
      width: 1440,
      height: 640,
    },
    {
      src: "/images/main_banner_3.png",
      alt: "sijak_position",
      width: 1440,
      height: 640,
    },
  ];

  return (
    <div className="flex w-full flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex relative flex-col desktop:w-full desktop:h-full tablet:w-full table:h-full mobile:w-full ">
            <ImageCarousel
              setApi={setApi}
              images={descriptionImages}
              isPreviousIcon
              isNextIcon
            />
            <div className="flex flex-row absolute bottom-5 desktop:right-[122px] tablet:right-8 mobile:right-6 gap-1 bg-custom-blackBackground px-3 py-[3px] rounded-full">
              <div className="text-white text-sm font-bold">{`${current}`}</div>
              <div className="text-custom-textDescriptionGrayColor text-sm font-bold">{`/ ${count}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
