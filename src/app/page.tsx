"use client";

import { Button, CarouselApi, Progress } from "@/shared/ui";
import {
  Description,
  IntroductionBanner,
  LectureCarousel,
  LectureList,
  SkeletonCard,
} from "@/entities/lecture/ui";
import {
  LectureInfo,
  LectureSize,
  PickLectureInfo,
} from "@/entities/lecture/model/lecture";
import { useEffect, useState } from "react";

import Image from "next/image";
import { LoginUserInfo } from "@/entities/user/model/user";
import Map from "@/features/map/ui/Map/Map";
import MapSkeleton from "@/features/map/ui/MapSkeleton/MapSkeleton";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useHomeLectureList from "@/entities/lecture/api/useHomeLectureList";
import useLoginedUserStore from "@/shared/store/user";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";
import { useRouter } from "next/navigation";

const Home = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>();
  const [pickLectureListData, sePickLectureListData] =
    useState<PickLectureInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    // dist: 500,
  });
  const [user, setUser] = useState<LoginUserInfo>({
    id: 0,
    email: "",
    nickname: "",
    gender: "male",
    age_range: "",
    birth: "",
    phone_number: "",
    latitude: 0,
    longitude: 0,
    location: "",
  });
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { current, count } = useCarouselApi(carouselApi);

  const { loginedUser: loginedUserState, setLoginedUser: setLoginedUserStore } =
    useLoginedUserStore();

  const getHomeLectureList = useHomeLectureList();
  const isLoading = getHomeLectureList.isIdle || getHomeLectureList.isPending;

  const geolocation = useGeoLocation();

  const router = useRouter();

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude &&
      loginedUserState
    ) {
      setLoginedUserStore({
        id: loginedUserState.id,
        email: loginedUserState.email,
        nickname: loginedUserState.nickname,
        gender: loginedUserState.gender,
        age_range: loginedUserState.age_range,
        birth: loginedUserState.birth,
        phone_number: loginedUserState.phone_number,
        location: loginedUserState.location,
        latitude: geolocation.curLocation
          ? geolocation.curLocation.latitude
          : 0,
        longitude: geolocation.curLocation
          ? geolocation.curLocation.longitude
          : 0,
      });

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.curLocation]);

  useEffect(() => {
    if (user.latitude && user.longitude) {
      getHomeLectureList.mutate(
        {
          params: {
            page: lectureSize.page,
            size: lectureSize.size,
            // dist: lectureSize.dist,
          },
          payload: {
            latitude: user.latitude,
            longitude: user.longitude,
          },
        },
        {
          onSuccess: (data) => {
            const lectureListData = data.data.data.data;
            const pickLectureListData = data.data.data.pickClasses;
            setLectureListData(lectureListData);
            sePickLectureListData(pickLectureListData);
          },
          onError: () => {},
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSize.page, lectureSize.size, user]);

  const linkToEntireLecture = () => {
    router.push("/entire");
  };

  const calculateProgressBar = () => {
    if (current === count) {
      return 100;
    }
    return (100 / count) * current;
  };

  const renderHomeLectureList = () => {
    if (isLoading) {
      return (
        <div className="flex flex-row space-x-6">
          <SkeletonCard type="col" />
          <SkeletonCard type="col" />
          <SkeletonCard type="col" />
        </div>
      );
    }

    if (lectureListData && lectureListData.length > 0) {
      return (
        <div className="flex flex-col desktop:w-full desktop:h-full tablet:w-full table:h-full mobile:w-full gap-9">
          <LectureCarousel
            lectureInfo={lectureListData}
            setApi={setCarouselApi}
            isNextIcon
            isPreviousIcon
          />
          <div className="flex flex-row items-center justify-center gap-[18px]">
            <Progress
              value={calculateProgressBar()}
              className="h-[3px] rounded-none"
            />
            <div className="flex flex-row items-center justify-center w-[60px] h-[38px] gap-1">
              <div className="text-custom-textBlackColor text-sm font-bold">{`${current}`}</div>
              <div className="text-custom-textDescriptionGrayColor text-sm font-bold">{`/ ${count}`}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-2xl font-semibold">클래스가 존재하지 않습니다</div>
    );
  };

  const renderPickLectureList = () => {
    if (isLoading) {
      return (
        <div className="flex desktop:flex-row tablet:flex-col gap-6">
          <SkeletonCard type="col" />
          <SkeletonCard type="col" />
        </div>
      );
    }

    if (pickLectureListData && pickLectureListData.length > 0) {
      return (
        <LectureList lectureListData={pickLectureListData} type="pickLecture" />
      );
    }

    return (
      <div className="text-2xl font-semibold">클래스가 존재하지 않습니다</div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col 16">
      <Description />
      <div className="flex flex-col desktop:px-[120px] tablet:px-8 mobile:px-6 desktop:pt-[84px] tablet:pt-12 mobile:pt-12 desktop:pb-[120px] tablet:pb-[99px] mobile:pb-[82px] bg-custom-homeMapBackground desktop:gap-[120px] tablet:gap-[80px] mobile:gap-[80px]">
        <div className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
          <div className="flex flex-col desktop:gap-8 tablet:gap-6 mobile:gap-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-1">
                <div className="desktop:text-2xl tablet:text-xl mobile:text-xl font-bold">
                  내 주변 문화생활 클래스☺️
                </div>
              </div>
              <div className="flex justify-center items-center content-center text-base">
                <Button
                  variant={"outline"}
                  onClick={linkToEntireLecture}
                  className="px-3"
                >
                  <div className="flex justify-center items-center gap-1">
                    <div className="desktop:flex tablet:hidden mobile:hidden text-sm">
                      클래스
                    </div>
                    <div className="text-sm">더보기</div>
                    <Image
                      src="/icons/class_arrow_right.svg"
                      alt="class arrow right"
                      width={20}
                      height={20}
                    />
                  </div>
                </Button>
              </div>
            </div>
            {isLoading && <MapSkeleton />}
            {lectureListData && (
              <Map
                latitude={user.latitude}
                longitude={user.longitude}
                lectureListData={lectureListData}
              />
            )}
          </div>
          <div className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
            <div className="flex flex-row w-full gap-1">
              <div className="font-semibold desktop:text-xl tablet:text-base mobile:text-base">
                내 위치에서
              </div>
              <div className="flex">
                <div className="text-custom-purple font-bold desktop:text-xl tablet:text-base mobile:text-base">
                  1km 이내
                </div>
                <div className="font-semibold desktop:text-xl tablet:text-base mobile:text-base">
                  에 이런 클래스가 있어요!
                </div>
              </div>
            </div>
            <div>{renderHomeLectureList()}</div>
          </div>
        </div>
        <IntroductionBanner />
        <div className="flex flex-col pb-4 gap-5">
          <div className="flex flex-col">
            <div className="flex flex-row gap-1">
              <div className="font-bold desktop:text-2xl tablet:text-xl mobile:text-xl">
                시:작 PICK
              </div>
              <div className="desktop:text-2xl tablet:text-xl mobile:text-xl">
                클래스 📌
              </div>
            </div>
            <div className="font-medium desktop:text-xl tablet:text-base mobile:text-base">
              조회 수 많은 추천 클래스를 소개할게요!
            </div>
          </div>
          <div>{renderPickLectureList()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
