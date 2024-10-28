import { Divider, Skeleton } from "@/shared/ui";
import {
  Lecture,
  LectureDetailListProps,
  LectureDetailTitleEnum,
  lectureDetailList,
} from "../../model/lecture";

import { LectureDetailItem } from "./LectureDetailItem";

interface LectureDetailProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureDetail = ({ lectureInfo, isLoading }: LectureDetailProps) => {
  return (
    <div className="flex flex-col w-full desktop:px-[120px] tablet:px-8 mobile:px-6 pb-[349px] desktop:gap-[140px] tablet:gap-[52px] mobile:gap-5">
      <section className="flex flex-col justify-center desktop:w-full tablet:w-[704px] mobile:w-[312px] desktop:gap-[30px] tablet:gap-[20px] mobile:gap-[20px]">
        <h3 className="font-bold desktop:w-full h-[70px] desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] border-b border-black content-center">
          클래스 내용
        </h3>
        <div className="flex flex-col gap-7">
          {lectureDetailList.map(
            (lectureDetailItem: LectureDetailListProps) => {
              return (
                <div
                  className="flex flex-col gap-7"
                  key={lectureDetailItem.type}
                >
                  <LectureDetailItem
                    title={LectureDetailTitleEnum[lectureDetailItem.type]}
                    content={
                      lectureInfo
                        ? lectureDetailItem.render(
                            lectureInfo[lectureDetailItem.type],
                          )
                        : " "
                    }
                    images={lectureInfo?.images}
                  />
                  <Divider />
                </div>
              );
            },
          )}
        </div>
      </section>
      <section className="flex flex-col desktop:w-[1200px] tablet:w-[704px] mobile:w-[312px] desktop:gap-[30px] tablet:gap-[20px] mobile:gap-[20px]">
        <h3 className="font-bold content-center desktop:w-full tablet:w-[600px] h-[70px] desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] border-b border-black">
          강사 이력
        </h3>
        {isLoading && <Skeleton className="w-[698px] h-[148px]" />}
        {lectureInfo && (
          <div className="flex flex-col gap-1">
            <div className="flex w-full h-8 font-bold desktop:text-xl tablet:text-base mobile:text-base">
              {lectureInfo.instructor_name.map((instructor) => instructor.name)}
            </div>
            <ul className="flex flex-col h-full desktop:text-xl tablet:text-base mobile:text-base">
              {lectureInfo.instructor_name.map((instructor) => {
                return instructor.instructor_history.map((history, idx) => {
                  return <li key={idx}>{history.content}</li>;
                });
              })}
            </ul>
          </div>
        )}
      </section>
      <section className="font-bold desktop:w-[1200px] tablet:w-[704px] mobile:w-[312px] h-[70px] text-[28px] border-b border-black">
        <h3 className="font-bold content-center desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] gap-4">
          교육 계획
        </h3>
        {/* {isLoading && <Skeleton className="w-[698px] h-[148px]" />} */}
        {/* {lectureInfo && <div>{lectureInfo.educationPlan}</div>} */}
      </section>
    </div>
  );
};

export default LectureDetail;
