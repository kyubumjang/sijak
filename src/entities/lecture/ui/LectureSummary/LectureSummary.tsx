import {
  Lecture,
  LectureTitleEnum,
  lectureSummaryList,
} from "../../model/lecture";

import { LectureSummaryHeader } from "./LectureSummaryHeader";
import { LectureSummaryItem } from ".";

interface LectureInfoDetail {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureSummary = ({ lectureInfo, isLoading }: LectureInfoDetail) => {
  return (
    <div className="flex flex-col w-full desktop:w-[569px] tablet:w-[343px] mobile:w-[312px]">
      <div className="flex flex-col desktop:gap-[18px] tablet:gap-[13px] mobile:gap-6">
        <LectureSummaryHeader lectureInfo={lectureInfo} isLoading={isLoading} />
        <div className="flex flex-col">
          <div className="flex flex-col desktop:gap-[18px] tablet:gap-4 mobile:gap-3">
            {lectureSummaryList.map((lectureSummaryItem) => {
              return (
                <LectureSummaryItem
                  key={lectureSummaryItem.type}
                  src={lectureSummaryItem.src}
                  title={LectureTitleEnum[lectureSummaryItem.type]}
                  content={
                    lectureInfo
                      ? lectureSummaryItem.render(
                          lectureInfo[lectureSummaryItem.type],
                        )
                      : ""
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureSummary;
