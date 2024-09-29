"use client";

import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { ClassList } from "@/entities/class/ui";
import { Description } from "@/shared/ui";
import Map from "@/features/map/ui/Map/Map";
import MapSkeleton from "@/features/map/ui/MapSkeleton/MapSkeleton";
import SkeletonCard from "@/entities/class/ui/Class/SkeletonCard/SkeletonCard";
import { User } from "@/entities/user/model/user";
import useClassList from "@/entities/class/api/useClassList";
import { useGeoLocation } from "@/shared/lib/useGeolocation";

const Home = () => {
  const [classListData, setClassListData] = useState<Class[]>();

  // TODO: 로그인 유저 정보 전역으로 변경
  const [loginedUser, setLoginedUser] = useState<User>({
    id: 1,
    account_email: "jkb2221@gmail.com",
    profile_image:
      "https://avatars.githubusercontent.com/u/33307948?s=400&u=a642bbeb47b47e203f37b47db12d2d92d8f98580&v=4",
    name: "kyubumjang",
    gender: "male",
    age_range: "20~29",
    applied_class: [
      {
        id: 1,
        name: "디지털카메라초급(눈으로 사진찍기)",
        description:
          "컴팩트 카메라부터 DSLR 카메라까지 디지털 카메라에 대해서 이해하고 카메라의 모든 기능을 200% 활용하는데 목적을 둔다 ** 사진입문자를 위한 수업입니다. ** 3개월 동안 사진 완전초보를 벗어날 수 있도록 도와드립니다. **야외수업시 보험가입 필수 (1일 보험료 별도) 보험가입증서 제출 또는 동의서 작성",
        price: 90000,
        day_of_week: "수",
        time: "2024-09-16 18:00:00",
        capacity: 15,
        link: "https://www.songpawoman.org/2024/epit_contents.asp?epit_num=10501042&om=202410&ucode=&period=3",
        location: "서울 송파",
        latitude: 37.5059054977082,
        longitude: 127.109788230628,
        target: "사진 입문자",
        status: "모집 중",
        thumbnail:
          "https://images.unsplash.com/photo-1601134991665-a020399422e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        like: true,
        location_detail: "송파여성문화회관 미디어1실(101호)",
        hosted_by: "송파여성문화회관",
        address: "서울특별시 송파구 백제고분로42길 5",
      },
    ],
    latitude: 37.5059054977082,
    longitude: 127.109788230628,
    city: "서울특별시",
  });
  const { data, isLoading, isSuccess } = useClassList();

  const geolocation = useGeoLocation();

  const handleClassDataList = useCallback(() => {
    if (data) {
      const classData = data;
      setClassListData(classData);
    }
  }, [data]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setLoginedUser((prev) => {
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
    if (isSuccess) {
      handleClassDataList();
    }
  }, [handleClassDataList, isSuccess]);

  return (
    <div className="flex w-full h-full flex-col 16">
      <Description />
      <div className="flex flex-col px-[120px] py-[60px] bg-[#F0F0F0] gap-5">
        <div className="flex flex-row gap-1">
          <div className="text-3xl font-bold">📍 내 주변 클래스</div>
          <div className="text-3xl">둘러보기</div>
        </div>
        {isLoading && <MapSkeleton />}
        {classListData && (
          <Map
            latitude={loginedUser.latitude}
            longitude={loginedUser.longitude}
            classListData={classListData}
          />
        )}
        {/* 로그인 한 사용자의 경우  */}
        <div className="flex flex-col gap-5 pt-10">
          <div className="font-semibold text-2xl">
            가장 가까운 순으로 클래스 정보를 보여드릴게요!
          </div>
          <div>
            {isLoading ? (
              <div className="flex flex-row space-x-6">
                <SkeletonCard type="col" />
                <SkeletonCard type="col" />
                <SkeletonCard type="col" />
              </div>
            ) : classListData ? (
              <ClassList classListData={classListData} type="col" />
            ) : (
              <div className="text-2xl font-semibold">
                클래스가 존재하지 않습니다
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col pb-4 px-[120px] py-[60px] gap-5">
        <div className="flex flex-row gap-1">
          <div className="font-bold text-2xl">시:작 PICK</div>
          <div className="text-2xl">클래스 📌</div>
        </div>
        <div>
          {isLoading ? (
            <div className="flex desktop:flex-row tablet:flex-col gap-6">
              <SkeletonCard type="row" />
              <SkeletonCard type="row" />
            </div>
          ) : classListData ? (
            <ClassList classListData={classListData} type="row" />
          ) : (
            <div>클래스가 존재하지 않습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
