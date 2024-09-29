"use client";

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { HeartFilledIcon, PersonIcon } from "@radix-ui/react-icons";

import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { User } from "@/entities/user/model/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  // TODO: 전역 상태 관리 - 로그인 된 유저 여부 판단
  const [loginedUser, setLoginedUser] = useState<User>();

  /* FIXME: isLogin 개발 편의상 임시 처리 */
  const [isLogin, setIsLogin] = useState(false);
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
    <div className="flex w-full h-16 justify-between items-center gap-2 p-2 fixed top-0 bg-white z-10 px-[120px] mobile:px-4">
      <div className="flex flex-col w-20 min-w-[55px] justify-center items-center gap-2">
        <Link href="/">
          <Image
            src="/images/sijak_logo.png"
            alt="sijak_logo"
            width={94}
            height={80}
          />
        </Link>
      </div>
      {/* FIXME: 수정 필요 */}
      <div className="flex w-full">
        <div className="desktop:flex tablet:flex mobile:hidden flex-row items-center justify-center w-full gap-0">
          <div className="flex min-w-[80px] text-md text-[#4F118C]">
            50+ 시ː니어
          </div>
          <div className="flex w-full min-w-44 text-md text-gray-600">
            를 위한 문화생활 플랫폼
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-center gap-2 h-full">
        {/* FIXME: isLogin 개발 편의상 임시 처리 */}
        {loginedUser && isLogin ? (
          <Link href="/like">
            <div className="flex flex-col items-center justify-center w-[38px] h-[52px]">
              <Image
                src={"/icons/heart_default.svg"}
                alt="heart-icons"
                width={28}
                height={28}
              />
              <div className="flex justify-center text-sm text-gray-400">
                찜
              </div>
            </div>
          </Link>
        ) : (
          <Dialog open={openLike} onOpenChange={setOpenLike}>
            <DialogTrigger>
              <div
                className="flex flex-col items-center justify-center w-[38px] h-[52px] cursor-pointer"
                onClick={handleOpenLikeDialog}
              >
                <Image
                  src={"/icons/heart_default.svg"}
                  alt="heart-icons"
                  width={28}
                  height={28}
                />
                <div className="flex justify-center text-sm text-gray-400">
                  찜
                </div>
              </div>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <div className="flex flex-col gap-[19px] py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-[28px] h-[71px] content-center">
                      로그인이 필요한 서비스 입니다.
                    </div>
                    <div
                      className="text-[#737373] text-base underline cursor-pointer"
                      onClick={linkToLogin}
                    >
                      간편 회원가입
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <Button
                      className="w-[410px] h-[56px] text-2xl font-semibold bg-[#4F118C]"
                      type="submit"
                      onClick={linkToLogin}
                    >
                      로그인 하기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}
        {/* FIXME: isLogin 개발 편의상 임시 처리 */}
        {loginedUser && isLogin ? (
          <Link href={`/user/${loginedUser.id}`}>
            <div className="flex flex-col items-center justify-center w-[70px] h-[52px]">
              <Image
                src={"/icons/user_default.svg"}
                alt="user-icons"
                width={28}
                height={28}
              />
              <div className="flex w-[70px] justify-center text-sm text-gray-400">
                마이페이지
              </div>
            </div>
          </Link>
        ) : (
          <Dialog open={openUser} onOpenChange={setOpenUser}>
            <DialogTrigger>
              <div
                className="flex flex-col items-center justify-center w-[70px] h-[52px]"
                onClick={handleOpenUserDialog}
              >
                <Image
                  src={"/icons/user_default.svg"}
                  alt="user-icons"
                  width={28}
                  height={28}
                />
                <div className="flex w-[70px] justify-center text-sm text-gray-400">
                  마이페이지
                </div>
              </div>
            </DialogTrigger>
            <DialogPortal>
              <DialogTitle>마이페이지</DialogTitle>
              <DialogContent>
                <div className="flex flex-col gap-[19px] py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-[28px] h-[71px] content-center">
                      로그인이 필요한 서비스 입니다.
                    </div>
                    <div
                      className="text-[#737373] text-base underline cursor-pointer"
                      onClick={linkToLogin}
                    >
                      간편 회원가입
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <Button
                      className="w-[410px] h-[56px] text-2xl font-semibold bg-[#4F118C]"
                      type="submit"
                      onClick={linkToLogin}
                    >
                      로그인 하기
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
