import { Button } from "@/shared/ui";
import { Class } from "@/entities/class/model/class";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface ClassCardProps {
  classData: Class;
  type: "row" | "col";
}

const ClassCard = (props: ClassCardProps) => {
  const { classData, type } = props;
  const {
    id,
    thumbnail,
    name,
    description,
    price,
    day_of_week,
    time,
    capacity,
    link,
    location,
    target,
    status,
    like,
    location_detail,
    hosted_by,
  } = classData;

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // FIXME: 콘솔 로그 삭제
    console.log("좋아요!");
    // TODO: 좋아요 API 연동
  };

  return type === "col" ? (
    <Link href={`/class/${id}`}>
      <div className="flex flex-col max-w-[384px] max-h-[507px] bg-white rounded-[20px] overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="">
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={384}
                height={310}
                className="object-cover w-[384px] h-[310px]"
              />
            </div>
            <div className="flex flex-col max-w-[384px] min-h-[197px] px-6 py-[28px] gap-[44px]">
              <div className="flex flex-col max-w-[336px] max-h-[70px]">
                <div className="flex flex-col gap-1">
                  <div className="text-gray-950 text-base whitespace-nowrap text-ellipsis overflow-hidden">
                    {target}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-950 text-2xl min-w-[150px] max-w-[300px] overflow-hidden break-words whitespace-nowrap text-ellipsis">
                      [{name}]
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex items-center justify-center min-w-[36px] min-h-[36px]"
                      onClick={(e) => handleLikeClick(e)}
                    >
                      {like ? (
                        <Image
                          src="/icons/like_filled.svg"
                          alt="heart"
                          width={28}
                          height={28}
                        />
                      ) : (
                        <Image
                          src="/icons/like.svg"
                          alt="heart filled"
                          width={28}
                          height={28}
                        />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between max-w-[336px] max-h-[28px]">
                {/* FIXME: 색상 추가 */}
                <div className="text-lg text-[#404040] font-semibold">
                  {location}
                </div>
                <div className="text-lg text-[#737373]">
                  {time.split(" ")[0].replaceAll("-", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <Link href={`/class/${id}`}>
      <div className="flex flex-row justify-start max-w-[588px] max-h-[210px] gap-5 rounded-[20px] overflow-hidden bg-white drop-shadow-sm">
        <div className="">
          <Image
            src={thumbnail}
            alt="thumbnail_image_row"
            width={180}
            height={210}
            className="object-cover w-[180px] h-[210px]"
          />
        </div>
        <div className="flex flex-col gap-[18px] py-6">
          <div className="flex h-[35px]">
            {/* TODO: CHIP 컴포넌트 개발 필요 */}
            <div className="w-[56px] h-[35px] rounded-3xl text-lg font-bold bg-[#4F118c] text-white content-center text-center ">
              문화
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-3xl min-w-[150px] max-w-[368px] whitespace-nowrap break-words text-ellipsis overflow-hidden">
              {name}
            </div>
            <div className="text-lg text-[#A3A3A3] min-w-[150px] max-w-[368px] whitespace-nowrap break-words text-ellipsis overflow-hidden">
              {target}
            </div>
          </div>
          <div className="flex justify-between w-[368px] max-w-[368px] max-h-[27px]">
            {/* FIXME: 색상 추가 */}
            <div className="text-lg text-[#404040] font-semibold">
              {location}
            </div>
            <div className="text-lg text-[#737373]">
              {time.split(" ")[0].replaceAll("-", ".")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
