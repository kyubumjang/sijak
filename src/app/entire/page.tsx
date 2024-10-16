"use client";

import {
  LectureInfo,
  LecturePayload,
  LectureSize,
} from "@/entities/lecture/model/lecture";
import {
  LectureList,
  NotFoundLecture,
  SkeletonCard,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { BackToPrevious } from "@/shared/ui";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import { useInView } from "react-intersection-observer";
import useLectureList from "@/entities/lecture/api/useLectureList";

const EntirePage = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>([]);
  const [user, setUser] = useState<LecturePayload>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    // dist: 500,
  });
  const [hasNext, setHasNext] = useState(true);

  const { ref, inView } = useInView({
    threshold: 1.0, // 100% 보일 때 트리거
  });

  const getLectureList = useLectureList();
  const isLoading = getLectureList.isIdle || getLectureList.isPending;

  const geolocation = useGeoLocation();

  useEffect(() => {
    if (user && user.latitude && user.longitude) {
      getLectureList.mutate(
        {
          page: lectureSize.page,
          size: lectureSize.size,
          // dist: lectureSize.dist,
        },

        {
          onSuccess: (data) => {
            const lectureListData = data.data.data.data;
            setLectureListData((prev) => [...prev, ...lectureListData]);
            setHasNext(data.data.data.hasNext);
          },
          onError: () => {},
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSize.page, lectureSize.size, user]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setUser((prev) => {
        return {
          ...prev,
          latitude: geolocation.curLocation
            ? geolocation.curLocation.latitude
            : 0,
          longitude: geolocation.curLocation
            ? geolocation.curLocation.longitude
            : 0,
        };
      });
    }
  }, [geolocation.curLocation]);

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

  const renderEntireCardContent = () => {
    if (lectureListData && lectureListData.length > 0) {
      return (
        <div>
          <LectureList lectureListData={lectureListData} type="pickLecture" />
          <div ref={ref} className="desktop:h-6 tablet:h-4 mobile:h-9" />{" "}
          {/* 스크롤 감지 요소 */}
          {isLoading && (
            <div className="flex flex-row space-x-4">
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
        <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
        </div>
      );
    }

    return <NotFoundLecture />;
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center desktop:pt-20 tablet:pt-10 mobile:pt-10 bg-custom-homeMapBackground relative">
      <div className="desktop:hidden tablet:flex mobile:hidden absolute top-10 left-4">
        <BackToPrevious />
      </div>
      <div className="desktop:flex tablet:flex mobile:hidden flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-1">
          <div className="text-custom-textBlackColor text-[32px] font-bold">
            전체 클래스
          </div>
          <div className="text-custom-textBlackColor text-[32px]">
            한번에 보기
          </div>
        </div>
      </div>
      <div className="flex flex-col desktop:pt-[50px] tablet:pt-10 pb-[209px]">
        <div className="flex desktop:px-[120px] tablet:px-8 mobile:px-6">
          {renderEntireCardContent()}
        </div>
      </div>
    </div>
  );
};

export default EntirePage;
