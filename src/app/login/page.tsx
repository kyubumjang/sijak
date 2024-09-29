"use client";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";

import Image from "next/image";

const LoginPage = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] justify-center items-center pb-4">
      <div className="flex flex-col w-full gap-24">
        <div className="flex flex-col gap-10">
          <div className="flex w-full flex-col justify-center items-center">
            <div className="text-gray-700 text-4xl font-bold ">반가워요!</div>
            <div className="text-gray-900 text-3xl">오늘부터 시ː작해요!</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <TooltipProvider>
            {/* TODO: TOOLTIP ARROW */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* TODO: 카카오 색상으로 변경 */}
                <Button
                  className="bg-yellow-300 hover:bg-yellow-400 text-black w-[351px] h-[61px]"
                  size="lg"
                  onClick={handleKakaoLogin}
                >
                  <div className="flex gap-2 items-center justify-center text-base">
                    <Image
                      src={"/icons/kakao_logo.svg"}
                      alt="kakao logo"
                      width={18}
                      height={18}
                    />
                    카카오톡 간편 로그인
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white relative">
                <div className="flex flex-col justify-center items-center w-[168px] h-10 bg-[#525252] rounded-3xl">
                  <div className="font-bold text-sm text-white">
                    🎉 5초만에 시작하기!
                  </div>
                </div>
                {/* TODO: 화살표 작업 */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-b-[#525252]"></div> */}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
