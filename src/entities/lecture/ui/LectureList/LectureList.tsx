import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";

import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import { LectureCard } from "../LectureCard";

interface LectureListProps {
  lectureListData:
    | LectureInfo[]
    | PickLectureInfo[]
    | HeartsLectureListResDataInfo[];
  type: "homeLecture" | "pickLecture";
}

const LectureList = ({ lectureListData, type }: LectureListProps) => {
  return (
    <div className="w-full grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9 ">
      {lectureListData.map((lectureData) => {
        return (
          <LectureCard
            key={lectureData.id}
            lectureData={lectureData}
            type={type}
          />
        );
      })}
    </div>
  );
};

export default LectureList;
