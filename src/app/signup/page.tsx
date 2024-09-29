"use client";

import { Button, Input } from "@/shared/ui";

import { useState } from "react";

const SignUpPage = () => {
  const [borderColor, setBorderColor] = useState("#4F118C");

  // TODO: 디바운싱 적용
  // TODO: 닉네임 상태관리
  // TODO: Validation Check
  // TODO: 중복 ID 체크 API
  // TODO: border 색상 관리

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] justify-center items-center p-4">
      <div className="flex flex-col gap-[72px]">
        <div className="flex w-full flex-col justify-center items-center gap-[5px]">
          <div className="text-gray-900 font-bold text-[40px]">
            닉네임을 적어주세요!
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <div className="text-gray-700 text-lg">
              시ː작에서 사용할 닉네임을 적어주세요.
            </div>
            <div className="text-gray-700 text-lg">
              닉네임은 나중에 수정할 수 있어요.
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-[72px] items-center">
          <div className="w-[400px] h-[88px]">
            <div className="text-[#4F118C]">닉네임 입력</div>
            {/* TODO: 이 방식이 맞는지 확인 필요 */}
            <div className={`border-b-2 border-[${borderColor}]`}>
              <Input
                placeholder="띄어쓰기 없이 2자 ~ 12자까지 가능해요."
                className="text-lg border-none shadow-none h-14 focus-visible:ring-0"
              />
            </div>
          </div>
          <Button className="flex justify-center items-center w-[400px] h-14 bg-[#4F118C]">
            <div className="text-2xl text-center">시ː작 하기</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
