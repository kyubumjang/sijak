"use client";

import { CarouselApi, ImageCarousel } from "../../../../shared/ui";
import { useEffect, useState } from "react";

import { CarouselImage } from "@/shared/ui/ImageCarousel/ImageCarousel";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";

const Description = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [windowWidth, setWindowWidth] = useState(1440);

  const { current, count } = useCarouselApi(api);

  const descriptionImages: CarouselImage[] = [
    {
      src: "https://s3.ap-northeast-2.amazonaws.com/sijak.app/mainbanner/main_banner_1.png",
      alt: "senior",
      width: 1440,
      height: 640,
    },
    {
      src: "https://s3.ap-northeast-2.amazonaws.com/sijak.app/mainbanner/main_banner_2.png",
      alt: "sijak_happy",
      width: 1440,
      height: 640,
    },
    {
      src: "https://s3.ap-northeast-2.amazonaws.com/sijak.app/mainbanner/main_banner_3.png",
      alt: "sijak_position",
      width: 1440,
      height: 640,
    },
  ];

  const mobileDescriptionImages: CarouselImage[] = [
    {
      src: "/images/main_banner_mobile_1.png",
      alt: "senior",
      width: 768,
      height: 400,
    },
    {
      src: "/images/main_banner_mobile_2.png",
      alt: "sijak_happy",
      width: 768,
      height: 400,
    },
    {
      src: "/images/main_banner_mobile_3.png",
      alt: "sijak_position",
      width: 768,
      height: 400,
    },
  ];

  const imagesByWindowWidth = () => {
    if (windowWidth < 768) {
      return mobileDescriptionImages;
    }
    return descriptionImages;
  };

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

  return (
    <section className="flex w-full flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex relative flex-col desktop:w-full desktop:h-full tablet:w-full tablet:h-full mobile:w-full ">
            <ImageCarousel
              setApi={setApi}
              images={imagesByWindowWidth()}
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
    </section>
  );
};

export default Description;
