"use client";

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { HeartIcon, PersonIcon } from "@radix-ui/react-icons";

import { Button } from "../Button";
import Link from "next/link";
import { User } from "@/entities/user/model/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  // TODO: 전역 상태 관리 - 로그인 된 유저 여부 판단
  const [loginedUser, setLoginedUser] = useState<User>();
  const [openLike, setOpenLike] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const router = useRouter();

  //TODO: 로그아웃 기능 구현
  const handleLogout = () => {
    // TODO: 전역 상태 관리 로그아웃
  };

  const handleOpenLikeDialog = () => {
    setOpenLike(true);
  };

  const handleOpenUserDialog = () => {
    setOpenUser(true);
  };

  const linkToLogin = () => {
    setOpenLike(false);
    setOpenUser(false);
    router.push("/login");
  };

  return (
    <div className="flex w-full h-16 justify-between items-center gap-2 p-2 fixed top-0 bg-white z-10">
      <div className="flex flex-col w-20 justify-center items-center gap-2">
        <Link href="/">
          <h1 className="font-bold text-2xl">시ː작</h1>
        </Link>
      </div>
      <div className="flex w-full">
        <span className="flex w-full text-xl">
          50+ 시ː니어를 위한 문화생활 플랫폼
        </span>
      </div>
      <div className="flex flex-row items-start justify-center gap-2 h-full">
        {loginedUser ? (
          <div
            className="flex flex-col items-center justify-center w-[94px] h-full cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex justify-center text-sm">로그아웃</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-[94px] h-full cursor-pointer">
            <Link href="/login">
              <div className="flex justify-center text-sm">로그인</div>
            </Link>
          </div>
        )}
        {loginedUser ? (
          <Link href="/like">
            <div className="flex flex-col items-center justify-center w-[32px] h-[58px]">
              <HeartIcon className="text-gray-600" width={24} height={24} />
              <div className="flex justify-center text-sm">찜</div>
            </div>
          </Link>
        ) : (
          <Dialog open={openLike} onOpenChange={setOpenLike}>
            <DialogTrigger>
              <div
                className="flex flex-col items-center justify-center w-[32px] h-[58px] cursor-pointer"
                onClick={handleOpenLikeDialog}
              >
                <HeartIcon className="text-gray-600" width={24} height={24} />
                <div className="flex justify-center text-sm">찜</div>
              </div>
            </DialogTrigger>
            <DialogPortal>
              <DialogTitle>로그인</DialogTitle>
              <DialogContent>
                <div className="flex flex-col gap-[60px]">
                  <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-gray-900 font-bold text-3xl">
                      로그인이 필요해요!
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-700 text-lg">
                        카카오 간편 로그인을 통해
                      </div>
                      <div className="text-gray-700 text-lg">
                        편하게 이용해보세요!
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <Button
                      className="w-[334px] h-[66px] text-lg"
                      type="submit"
                      onClick={linkToLogin}
                    >
                      간편 로그인 하러 가기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}
        {loginedUser ? (
          <Link href={`/user/${loginedUser.id}`}>
            <div className="flex flex-col items-center justify-center w-[70px] h-[58px]">
              <PersonIcon className="text-gray-600" width={24} height={24} />
              <div className="flex w-[70px] justify-center text-sm">
                마이페이지
              </div>
            </div>
          </Link>
        ) : (
          <Dialog open={openUser} onOpenChange={setOpenUser}>
            <DialogTrigger>
              <div
                className="flex flex-col items-center justify-center w-[70px] h-[58px]"
                onClick={handleOpenUserDialog}
              >
                <PersonIcon className="text-gray-600" width={24} height={24} />
                <div className="flex w-[70px] justify-center text-sm">
                  마이페이지
                </div>
              </div>
            </DialogTrigger>
            <DialogPortal>
              <DialogTitle>마이페이지</DialogTitle>
              <DialogContent>
                <div className="flex flex-col gap-[60px]">
                  <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-gray-900 font-bold text-3xl">
                      로그인이 필요해요!
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-700 text-lg">
                        카카오 간편 로그인을 통해
                      </div>
                      <div className="text-gray-700 text-lg">
                        편하게 이용해보세요!
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <Button
                      className="w-[334px] h-[66px] text-lg"
                      type="submit"
                      onClick={linkToLogin}
                    >
                      간편 로그인 하러 가기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Header;
