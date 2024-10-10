import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";
import { MouseEvent, useEffect, useState } from "react";

import { Button } from "@/shared/ui";
import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";

interface PickLectureCardProps {
  lectureData: LectureInfo | PickLectureInfo | HeartsLectureListResDataInfo;
  type: "homeLecture" | "pickLecture";
}

const PickLectureCard = (props: PickLectureCardProps) => {
  const { lectureData, type } = props;

  const {
    id,
    thumbnail,
    name,
    time,
    target,
    status,
    address,
    link,
    heart,
    start_date,
    end_date,
    day_of_week,
    division,
  } = lectureData;

  const [dimensions, setDimensions] = useState({ width: 384, height: 280 });

  const postLikeLecture = usePostLikeLecture(id);
  const deleteLikeLecture = useDeleteLikeLecture(id);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 312, height: 190 });
      } else if (window.innerWidth < 1440) {
        setDimensions({ width: 344, height: 256 });
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

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (lectureData.heart === true) {
      deleteLikeLecture.mutate(
        {
          lectureId: id,
        },
        {
          onSuccess: () => {
            toast("좋아요 삭제 성공");
          },
        },
      );
    }
    if (lectureData.heart === false) {
      postLikeLecture.mutate(
        {
          lectureId: id,
        },
        {
          onSuccess: () => {
            toast("좋아요 성공");
          },
        },
      );
    }
  };
  return (
    <Link
      href={`/class/${id}`}
      className="desktop:w-[384px] tablet:w-[344px] mobile:w-[312px] desktop:h-[468px] tablet:h-[389px] mobile:h-[323px]"
    >
      <div className="flex flex-col desktop:w-[384px] tablet:w-[344px] mobile:w-[312px] desktop:h-[468px] tablet:h-[389px] mobile:h-[323px] bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="relative desktop:w-[384px] tablet:w-[344px] mobile:w-[312px] desktop:h-[280px] tablet:h-[256px] mobile:h-[190px]">
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={dimensions.width}
                height={dimensions.height}
                className="object-cover desktop:w-[384px] tablet:w-[344px] mobile:w-[312px] desktop:h-[280px] tablet:h-[256px] mobile:h-[190px]"
              />
              <div className="flex items-center justify-center absolute top-3 left-3 desktop:w-16 tablet:w-[52px] mobile:w-[52px] desktop:h-[34px] tablet:h-[27px] mobile:h-[27px] rounded-sm bg-custom-purple content-center text-white text-base font-semibold">{`문화`}</div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center justify-center desktop:w-[32px] tablet:w-[24px] mobile:w-[24px] desktop:h-[32px] tablet:h-[24px] mobile:h-[24px]"
                  onClick={(e) => handleLikeClick(e)}
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
            <div className="flex flex-col desktop:px-[22px] tablet:px-4 mobile:px-4 desktop:py-5 tablet:pt-3 tablet:pb-[14px] mobile:pt-3 mobile:pb-[14px] desktop:gap-7 tablet:gap-4 mobile:gap-4">
              <div className="flex flex-col desktop:w-[340px] tablet:w-[304px] mobile:w-[272px] desktop:h-[93px] tablet:h-[67px] mobile:h-[67px]">
                <div className="flex flex-col gap-1">
                  <div className="text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm desktop:font-bold tablet:font-medium mobile:font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    {division}
                  </div>
                  <div className="flex justify-between items-center desktop:w-[340px] tablet:w-[304px] mobile:w-[272px]">
                    <div className="text-custom-textBlackColor desktop:text-2xl tablet:text-base mobile:text-base font-semibold desktop:w-[340px] tablet:w-[248px] mobile:w-[208px] min-w-[208px] max-w-[340px] desktop:min-h-[62px] tablet:min-h-[42px] mobile:min-h-[42px]">
                      [{name}]
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between desktop:w-[340px] tablet:w-[304px] mobile:w-[272px] desktop:h-[27px] tablet:h-[24px] mobile:h-[24px]">
                {/* FIXME: 색상 추가 */}
                <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-semibold tablet:font-medium mobile:font-medium">
                  {address}
                </div>
                <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-bold tablet:font-medium mobile:font-medium ">
                  {start_date.replaceAll("-", ".").split(".")[1]}.
                  {start_date.replaceAll("-", ".").split(".")[2]}({day_of_week}){" "}
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
    </Link>
  );
};

export default PickLectureCard;
