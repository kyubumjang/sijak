"use client";

import { Button, Input } from "@/shared/ui";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { User } from "@/entities/user/model/user";
import { useState } from "react";

const UserInfoPage = () => {
  // TODO: 전역 로그인된 유저 정보로 수정
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
        latitude: 108,
        longitude: 108,
        target: "사진 입문자",
        status: "모집 중",
        thumbnail:
          "https://images.unsplash.com/photo-1601134991665-a020399422e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        like: true,
        location_detail: "송파여성문화회관 미디어1실(101호)",
        hosted_by: "송파여성문화회관",
      },
    ],
    latitude: 100,
    longitude: 100,
    city: "서울특별시",
  });

  return (
    loginedUser && (
      <div className="flex flex-col w-full h-full justify-start items-star">
        <div className="flex flex-row justify-center h-14 px-[120px]">
          <div className="flex absolute left-32">
            <Link href="/">
              <div className="flex flex-col items-center justify-center">
                <ArrowLeftIcon width={32} height={32} />
                <div className="text-xs">뒤로가기</div>
              </div>
            </Link>
          </div>
          <div className="text-2xl">마이페이지</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4 pb-4">
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold text-2xl">{loginedUser.name}님</div>
              {/* TODO: 연령대 처리, 위도 경도 기반 저장할 db 필요(서울특별시) */}
              {loginedUser.age_range}대, {loginedUser.city}
            </div>
            {/* TODO: 컴포넌트화 InputLabel */}
            <div className="flex flex-col w-[588px] gap-2">
              <div className="flex flex-col gap-1">
                <div className="font-bold">닉네임</div>
                <Input placeholder={loginedUser.name} />
              </div>
              <div className="flex flex-col gap-1">
                <div>지역</div>
                <Input placeholder={loginedUser.city} />
              </div>
              <div className="flex flex-col gap-1">
                <div>이메일</div>
                <Input
                  type="email"
                  placeholder={loginedUser.account_email}
                  disabled
                  className="bg-gray-200"
                />
              </div>
              {/* TODO: 휴대폰 번호, 생년월일 필요한지 물어볼 것 */}
              <div className="flex flex-col gap-1">
                <div>휴대폰 번호</div>
                <Input
                  type="tel"
                  placeholder="010-0000-0000"
                  disabled
                  className="bg-gray-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>생년월일</div>
                <Input
                  placeholder="1900.01.01"
                  disabled
                  className="bg-gray-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>성별</div>
                <Input
                  placeholder={loginedUser.gender === "male" ? "남성" : "여성"}
                  disabled
                  className="bg-gray-200"
                />
              </div>
            </div>
            <div className="">
              <Button className="w-[588px] h-[66px]">저장하기</Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoPage;
