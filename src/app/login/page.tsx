import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";

import Image from "next/image";
import { RiKakaoTalkFill } from "react-icons/ri";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center pb-4">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-10">
          <div className="flex w-full flex-col justify-center items-center gap-2">
            <div className="text-gray-700 text-2xl">반가워요!</div>
            <div className="text-gray-900 font-bold text-3xl">
              오늘부터 시ː작해요!
            </div>
          </div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hello"
            width={351}
            height={158}
            priority
            className="w-auto h-auto"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-amber-300 hover:bg-amber-400 text-black"
                  size="lg"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <RiKakaoTalkFill />
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
