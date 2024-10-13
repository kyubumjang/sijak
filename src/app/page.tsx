"use client";

import { CarouselApi, Chip, Progress } from "@/shared/ui";
import {
  Description,
  IntroductionBanner,
  LectureCarousel,
  LectureList,
  SkeletonCard,
} from "@/entities/lecture/ui";
import {
  GetLocationLectureListParams,
  LectureInfo,
  LectureSize,
  MarkerLectureInfo,
  PickLectureInfo,
  lectureChipContentList,
  lectureChipContentMap,
  shortAddressList,
} from "@/entities/lecture/model/lecture";
import { Location, markerLocationMap } from "@/features/map/model/map";
import { useEffect, useState } from "react";

import { ChipStatus } from "@/shared/ui/Chip/Chip";
import { LoginUserInfo } from "@/entities/user/model/user";
import Map from "@/features/map/ui/Map/Map";
import MapSkeleton from "@/features/map/ui/MapSkeleton/MapSkeleton";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useHomeLectureList from "@/entities/lecture/api/useHomeLectureList";
import useLocationLectureList from "@/entities/lecture/api/useLocationLectureList";
import useLoginedUserStore from "@/shared/store/user";
import { useRouter } from "next/navigation";

const Home = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>();
  const [pickLectureListData, sePickLectureListData] =
    useState<PickLectureInfo[]>();
  const [markerLectureListData, setMarkerLectureListData] =
    useState<MarkerLectureInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    // dist: 500,
  });
  const [locationLectureParams, setLocationLectureParams] =
    useState<GetLocationLectureListParams>({
      page: 0,
      size: 9,
      location: " ",
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
  const [chipStatus, setChipStatus] = useState<
    Record<shortAddressList, ChipStatus>
  >({
    "서울 송파구": "default",
    "서울 마포구": "default",
    "서울 노원구": "default",
    "서울 강서구": "default",
  });
  const [markerLocation, setMarkerLocation] = useState<Location>();

  const { current, count } = useCarouselApi(carouselApi);

  const { loginedUser: loginedUserState, setLoginedUser: setLoginedUserStore } =
    useLoginedUserStore();

  const {
    data: locationLectureListData,
    isLoading: isLocationLectureListLoading,
    isSuccess: isLocationLectureListSuccess,
  } = useLocationLectureList({
    params: locationLectureParams,
  });
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
            const markerLectureListData = data.data.data.markerClasses;
            setLectureListData(lectureListData);
            sePickLectureListData(pickLectureListData);
            setMarkerLectureListData(markerLectureListData);
          },
          onError: () => {},
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSize.page, lectureSize.size, user]);

  useEffect(() => {
    if (
      isLocationLectureListSuccess &&
      locationLectureListData.data.data.data.length > 0
    ) {
      const locationLectureData = locationLectureListData.data.data.data;
      setLectureListData(locationLectureData);
    }
  }, [isLocationLectureListSuccess, locationLectureListData?.data.data.data]);

  const linkToEntireLecture = () => {
    router.push("/entire");
  };

  const calculateProgressBar = () => {
    if (current === count) {
      return 100;
    }
    return (100 / count) * current;
  };

  const filterLectureListByShortAddress = (
    lectureChipContent: shortAddressList,
  ) => {
    setChipStatus(() => {
      return {
        "서울 송파구":
          lectureChipContent === "서울 송파구" ? "active" : "default",
        "서울 마포구":
          lectureChipContent === "서울 마포구" ? "active" : "default",
        "서울 노원구":
          lectureChipContent === "서울 노원구" ? "active" : "default",
        "서울 강서구":
          lectureChipContent === "서울 강서구" ? "active" : "default",
      };
    });
    setMarkerLocation(() => {
      return {
        latitude: markerLocationMap[lectureChipContent]["latitude"],
        longitude: markerLocationMap[lectureChipContent]["longitude"],
      };
    });
    setLocationLectureParams((prev) => {
      return {
        ...prev,
        location: lectureChipContentMap[lectureChipContent],
      };
    });
  };

  const renderHomeLectureList = () => {
    if (isLoading || isLocationLectureListLoading) {
      return (
        <div className="flex flex-row space-x-6 desktop:px-[120px] tablet:px-8 mobile:px-6">
          <SkeletonCard type="homeLecture" />
          <SkeletonCard type="homeLecture" />
          <SkeletonCard type="homeLecture" />
        </div>
      );
    }

    if (lectureListData && lectureListData.length > 0) {
      return (
        <div className="flex flex-col desktop:w-full desktop:h-full tablet:w-full table:h-full mobile:w-full">
          <div className="desktop:pl-[120px] tablet:px-8 mobile:px-6">
            <LectureCarousel
              lectureInfo={lectureListData}
              setApi={setCarouselApi}
              isNextIcon
              isPreviousIcon
            />
          </div>
          <div className="flex flex-row items-center justify-center desktop:px-[120px] tablet:px-8 mobile:px-6 gap-[18px]">
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
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
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
      <div className="flex flex-col desktop:pt-[84px] tablet:pt-12 mobile:pt-12 desktop:pb-[120px] tablet:pb-[99px] mobile:pb-[82px] bg-custom-homeMapBackground desktop:gap-[120px] tablet:gap-[80px] mobile:gap-[80px]">
        <div className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
          <div className="flex flex-col desktop:px-[120px] tablet:px-8 mobile:px-6 desktop:gap-8 tablet:gap-6 mobile:gap-6">
            <div className="flex flex-row justify-between">
              <div className="desktop:text-2xl tablet:text-xl mobile:text-xl font-bold">
                내 주변 문화생활 클래스 ☺️
              </div>
            </div>
            {isLoading && <MapSkeleton />}
            {lectureListData && markerLectureListData && (
              <Map
                latitude={user.latitude}
                longitude={user.longitude}
                markerLatitude={markerLocation?.latitude}
                markerLongitude={markerLocation?.longitude}
                setLocationLectureParams={setLocationLectureParams}
                setChipStatus={setChipStatus}
                lectureListData={lectureListData}
                markerLectureListData={markerLectureListData}
              />
            )}
          </div>
          <div className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
            <div className="flex desktop:flex-row tablet:flex-row mobile:flex-col justify-between desktop:px-[120px] tablet:px-8 mobile:px-6 mobile:gap-[14px]">
              <div className="flex flex-row gap-2 desktop:max-w-[460px] tablet:max-w-[460px] mobile:max-w-[312px] overflow-x-scroll scrollbar-hide">
                {lectureChipContentList.map((lectureChipContent, idx) => (
                  <Chip
                    key={idx}
                    content={lectureChipContent}
                    status={chipStatus[lectureChipContent]}
                    handleClick={() =>
                      filterLectureListByShortAddress(lectureChipContent)
                    }
                  />
                ))}
              </div>
              <div className="flex desktop:justify-center tablet:justify-center mobile:justify-end desktop:items-center tablet:items-center content-center text-base">
                <div
                  onClick={linkToEntireLecture}
                  className="px-3 cursor-pointer"
                >
                  <div className="flex justify-center items-center gap-1 border-b border-custom-textBlackColor">
                    <div className="desktop:flex tablet:flex mobile:hidden text-sm">
                      클래스
                    </div>
                    <div className="text-sm">더보기</div>
                  </div>
                </div>
              </div>
            </div>
            <div>{renderHomeLectureList()}</div>
          </div>
        </div>
        <div className="desktop:px-[120px] tablet:px-8 mobile:px-6 ">
          <IntroductionBanner />
        </div>
        <div className="flex flex-col pb-4 desktop:px-[120px] tablet:px-8 mobile:px-6 gap-5">
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
