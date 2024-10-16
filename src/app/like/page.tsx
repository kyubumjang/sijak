"use client";

import { BackToPrevious, Button } from "@/shared/ui";
import {
  LectureList,
  NotFoundLecture,
  SkeletonCard,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import { LectureSize } from "@/entities/lecture/model/lecture";
import { toast } from "sonner";
import useDeleteDeactivatesLikeLecture from "@/features/like/api/useDeleteDeactivatesLikeLecture";
import { useInView } from "react-intersection-observer";
import useLikeLectureList from "@/features/like/api/useLikeLectureList";

const LikePage = () => {
  const [lectureListData, setLectureListData] =
    useState<HeartsLectureListResDataInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    // dist: 500,
  });
  const [hasNext, setHasNext] = useState(true);

  const { ref, inView } = useInView({
    threshold: 1.0, // 100% 보일 때 트리거
  });

  const { data, isLoading, isSuccess } = useLikeLectureList({
    page: lectureSize.page,
    size: lectureSize.size,
    // dist: lectureSize.dist,
  });

  const deleteDeactivatesLecture = useDeleteDeactivatesLikeLecture();

  const deleteDeactivatesLectures = () => {
    deleteDeactivatesLecture.mutate(undefined, {
      onSuccess: () => {
        toast("마감된 찜 클래스를 삭제했어요");
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setLectureListData(data.data.data);
      setHasNext(data.data.hasNext);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      setLectureSize((prev) => {
        return {
          ...prev,
          page: prev.page + 1,
        };
      }); // 다음 페이지 데이터 로드
    }
  }, [inView, hasNext, isLoading]);

  const renderLikeCardContent = () => {
    if (lectureListData && lectureListData.length > 0) {
      return (
        <div>
          <LectureList lectureListData={lectureListData} type="pickLecture" />
          <div ref={ref} className="h-[200px]" /> {/* 스크롤 감지 요소 */}
          {isLoading && (
            <div className="flex desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
              <SkeletonCard type="pickLecture" />
              <SkeletonCard type="pickLecture" />
              <SkeletonCard type="pickLecture" />
            </div>
          )}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-col gap-2">
          <div className="h-9" />
          <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
            <SkeletonCard type="pickLecture" />
            <SkeletonCard type="pickLecture" />
            <SkeletonCard type="pickLecture" />
          </div>
        </div>
      );
    }

    return (
      <NotFoundLecture
        description="아직 찜한 클래스가 없습니다. 마음에 드는 강좌를 찾아 찜해보세요!"
        isHideIcon
      />
    );
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center desktop:pt-20 tablet:pt-10 mobile:pt-10 bg-custom-homeMapBackground relative">
      <div className="desktop:hidden tablet:flex mobile:hidden absolute top-10 left-4">
        <BackToPrevious />
      </div>
      <div className="desktop:flex tablet:flex mobile:hidden flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-3">
          <div className="text-custom-textBlackColor desktop:text-[32px] tablet:text-[28px] mobile:text-base font-bold">
            내가 찜한 클래스
          </div>
          <div className="text-custom-textBlackColor desktop:text-[32px] tablet:text-[28px] mobile:text-base">
            한번에 보기
          </div>
        </div>
      </div>
      <div className="flex flex-col desktop:pt-[50px] tablet:pt-10 pb-[209px] gap-4">
        {!isLoading && lectureListData && lectureListData.length > 0 && (
          <div className="flex justify-end desktop:px-[120px] tablet:px-8 mobile:px-6">
            <Button
              className="bg-custom-purple hover:bg-custom-hoverPurple"
              onClick={deleteDeactivatesLectures}
            >
              마감된 클래스 삭제하기
            </Button>
          </div>
        )}
        <div className="flex desktop:px-[120px] tablet:px-8 mobile:px-6">
          {renderLikeCardContent()}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
