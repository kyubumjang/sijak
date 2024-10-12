import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";
import { useEffect, useState } from "react";

import { Button } from "@/shared/ui";
import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import Image from "next/image";
import { time } from "console";

interface DisabledHomeLectureCardProps {
  lectureData: LectureInfo | PickLectureInfo | HeartsLectureListResDataInfo;
}

const DisabledHomeLectureCard = (props: DisabledHomeLectureCardProps) => {
  const { lectureData } = props;

  const { thumbnail, name, time, short_address, division, heart, start_date } =
    lectureData;
  const [dimensions, setDimensions] = useState({ width: 384, height: 280 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 240, height: 168 });
      } else if (window.innerWidth < 1440) {
        setDimensions({ width: 280, height: 188 });
      } else {
        setDimensions({ width: 384, height: 280 });
      }
    };

    window.addEventListener("resize", handleResize);

    // 초기 크기 설정
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[468px] tablet:h-[343px] mobile:h-[323px] bg-white rounded-lg overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="relative desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px]">
            <Image
              src={thumbnail}
              alt="thumbnail"
              width={dimensions.width}
              height={dimensions.height}
              className="object-cover desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px]"
            />
            <div className="flex items-center justify-center absolute top-3 left-3 desktop:w-16 tablet:w-[52px] mobile:w-[52px] desktop:h-[34px] tablet:h-[27px] mobile:h-[27px] rounded-sm bg-custom-purple content-center text-white text-base font-semibold">{`문화`}</div>
            <div className="absolute top-3 right-3">
              <Button
                disabled
                variant="ghost"
                size="icon"
                className="flex items-center justify-center desktop:w-[32px] tablet:w-[24px] mobile:w-[24px] desktop:h-[32px] tablet:h-[24px] mobile:h-[24px] "
              >
                {heart ? (
                  <Image
                    src="/icons/like_filled.svg"
                    alt="heart"
                    width={32}
                    height={32}
                  />
                ) : (
                  <Image
                    src="/icons/like.svg"
                    alt="heart filled"
                    width={32}
                    height={32}
                  />
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col desktop:px-[22px] tablet:px-4 mobile:px-4 desktop:py-5 tablet:pt-3 tablet:pb-[14px] mobile:pt-3 mobile:pb-[14px] desktop:gap-7 tablet:gap-[14px] mobile:gap-[14px]">
            <div className="flex flex-col desktop:w-[340px] tablet:w-[248px] desktop:h-[93px] tablet:h-[67px]">
              <div className="flex flex-col gap-1">
                <div className="text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm desktop:font-bold tablet:font-medium mobile:font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                  {division}
                </div>
                <div className="flex justify-between items-center desktop:w-[340px] tablet:w-[248px] mobile:w-[208px]">
                  <div className="text-custom-textBlackColor desktop:text-2xl tablet:text-base mobile:text-base font-semibold desktop:w-[340px] tablet:w-[248px] mobile:w-[208px] min-w-[208px] max-w-[340px] desktop:min-h-[62px] tablet:min-h-[42px] mobile:min-h-[42px]">
                    [{name}]
                  </div>
                </div>
              </div>
            </div>
            <div className="flex desktop:flex-row tablet:flex-col mobile:flex-col desktop:justify-between desktop:w-[340px] tablet:w-[248px] mobile:w-[208px] desktop:h-[27px] tablet:h-[48px] mobile:h-[48px]">
              {/* FIXME: 색상 추가 */}
              <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-semibold tablet:font-medium mobile:font-medium">
                {short_address}
              </div>
              <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-bold tablet:font-medium mobile:font-medium ">
                {start_date.replaceAll("-", ".").split(".")[1]}.
                {/* FIXME:수정 */}
                {/* {start_date.replaceAll("-", ".").split(".")[2]}({day_of_week}){" "} */}
                {/* TODO: time to 오전 오후 시간 */}
                {Number(time.split(":")[0]) / 12 ? "오후" : "오전"}{" "}
                {Number(time.split(":")[0]) % 12}:
                {time.split(":")[1].slice(0, 2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisabledHomeLectureCard;
