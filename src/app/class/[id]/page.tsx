"use client";

import { Lecture, LecturePayload } from "@/entities/lecture/model/lecture";
import {
  LectureDetail,
  LectureFooter,
  LectureImageInfo,
  LectureSummary,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import Image from "next/image";
import LectureMinimap from "@/entities/lecture/ui/LectureSummary/LectureMinimap/LectureMinimap";
import Link from "next/link";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useLectureInfo from "@/entities/lecture/api/useLectureInfo";
import { useParams } from "next/navigation";

export const runtime = "edge";

const LectureInfoPage = () => {
  const [lectureInfo, setLectureInfo] = useState<Lecture>();
  const [user, setUser] = useState<LecturePayload>();
  const [windowInnerWidth, setWindowInnerWidth] = useState<string>();

  const { id } = useParams();

  const getLectureInfo = useLectureInfo(Number(id));
  const isLoading = getLectureInfo.isIdle || getLectureInfo.isPending;

  const geolocation = useGeoLocation();

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      // desktop
      setWindowInnerWidth("desktop");
    } else if (width >= 768) {
      // tablet
      setWindowInnerWidth("tablet");
    } else {
      // mobile
      setWindowInnerWidth("mobile");
    }
  };

  useEffect(() => {
    if (user) {
      getLectureInfo.mutate(
        {
          lectureId: Number(id),
          payload: { latitude: user.latitude, longitude: user.longitude },
        },
        {
          onSuccess: (data) => {
            setLectureInfo(data.data.data);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

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
    handleResize(); // 초기 렌더링 시 크기 설정
    window.addEventListener("resize", handleResize); // resize 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  const renderSummary = () => {
    if (windowInnerWidth === "desktop") {
      return renderDesktopSummary();
    }
    if (windowInnerWidth === "tablet") {
      return renderTabletSummary();
    }
    if (windowInnerWidth === "mobile") {
      return renderMobileSummary();
    }
  };

  const renderDesktopSummary = () => {
    return (
      <div className="desktop:flex tablet:hidden mobile:hidden w-full">
        <div className="flex flex-row w-full desktop:px-[120px] desktop:pt-[80px] gap-10">
          <LectureImageInfo lectureInfo={lectureInfo} isLoading={isLoading} />
          <div className="flex flex-col gap-6">
            <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
            <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  };

  const renderTabletSummary = () => {
    return (
      <div className="desktop:hidden tablet:flex mobile:hidden">
        <div className="flex flex-col tablet:px-8 gap-[35px]">
          <div className="flex flex-row w-full gap-[31px]">
            <LectureImageInfo lectureInfo={lectureInfo} isLoading={isLoading} />
            <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
          <div>
            <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  };

  const renderMobileSummary = () => {
    return (
      <div className="desktop:hidden tablet:hidden mobile:flex">
        <div className="flex flex-col w-full mobile:px-6 gap-8">
          <LectureImageInfo lectureInfo={lectureInfo} isLoading={isLoading} />
          <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
          <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-start desktop:gap-8 tablet:gap-[34px] mobile:gap-[44px]">
      <div className="w-full desktop:hidden tablet:flex mobile:hidden pl-4 pt-10">
        <Link href="/">
          <Image
            src="/icons/back_arrow_left.svg"
            alt="back"
            width={48}
            height={48}
          />
        </Link>
      </div>
      {renderSummary()}
      <LectureDetail lectureInfo={lectureInfo} isLoading={isLoading} />
      <LectureFooter lectureInfo={lectureInfo} isLoading={isLoading} />
    </div>
  );
};

export default LectureInfoPage;
