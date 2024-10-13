import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";

import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import Image from "next/image";
import Link from "next/link";

interface RowLectureCardProps {
  lectureData: LectureInfo | PickLectureInfo | HeartsLectureListResDataInfo;
  type: "homeLecture" | "pickLecture";
}

const RowLectureCard = (props: RowLectureCardProps) => {
  const { lectureData, type } = props;

  const { id, thumbnail, name, time, target, short_address } = lectureData;

  return (
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
            <div className="w-[56px] h-[35px] rounded-3xl text-lg font-bold bg-custom-purple text-white content-center text-center ">
              문화
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-3xl min-w-[150px] max-w-[368px] whitespace-nowrap break-words text-ellipsis overflow-hidden">
              {name}
            </div>
            <div className="text-lg text-custom-textDescriptionGrayColor min-w-[150px] max-w-[368px] whitespace-nowrap break-words text-ellipsis overflow-hidden">
              {target}
            </div>
          </div>
          <div className="flex justify-between w-[368px] max-w-[368px] max-h-[27px]">
            {/* FIXME: 색상 추가 */}
            <div className="text-lg text-custom-textSemiBoldBlackColor font-semibold">
              {short_address}
            </div>
            <div className="text-lg text-custom-textGrayColor">
              {time.split(" ")[0].replaceAll("-", ".")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RowLectureCard;
