import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";

import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import { HomeLectureCard } from "./HomeLectureCard";
import { PickLectureCard } from "./PickLectureCard";

interface LectureCardProps {
  lectureData: LectureInfo | PickLectureInfo | HeartsLectureListResDataInfo;
  type: "homeLecture" | "pickLecture";
}

const LectureCard = ({ lectureData, type }: LectureCardProps) => {
  return type === "homeLecture" ? (
    <HomeLectureCard lectureData={lectureData} type={type} />
  ) : (
    <PickLectureCard lectureData={lectureData} type={type} />
  );
};

export default LectureCard;
