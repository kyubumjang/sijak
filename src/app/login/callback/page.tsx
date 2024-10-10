"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SquareLoader } from "react-spinners";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import useGetAccessToken from "@/features/authentication/api/useGetAccessToken";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useLoginedUserStore from "@/shared/store/user";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // Access Token을 가져오는 훅
  const {
    data: tokenData,
    error: tokenError,
    isSuccess: isTokenSuccess,
  } = useGetAccessToken(code ? code : "");

  // 사용자 정보를 가져오는 훅
  const {
    data: loginUserData,
    isSuccess: isLoginUserSuccess,
    refetch,
  } = useGetLoginUserInfo();

  const { setLoginedUser } = useLoginedUserStore();

  useEffect(() => {
    if (isTokenSuccess && tokenData) {
      const accessToken = tokenData.tokenDTO.access_token;
      const refreshToken = tokenData.tokenDTO.refresh_token;

      // 쿠키 설정
      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      setCookie("refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // 로그인 사용자 정보 요청
      if (isLoginUserSuccess) {
        setLoginedUser(loginUserData.data.data);
        toast("회원가입 / 로그인 성공", {
          description: "시ː니어를 위한 문화생활 플랫폼에 오신 걸 환영합니다!",
        });

        if (tokenData.is_new) {
          router.push("/signup");
        } else {
          router.push("/");
        }
      } else {
        refetch();
      }
    }

    if (tokenError) {
      toast("로그인 실패", {
        description: `${tokenError}`,
      });
    }
  }, [
    code,
    tokenData,
    tokenError,
    isTokenSuccess,
    isLoginUserSuccess,
    loginUserData,
    router,
    setLoginedUser,
    refetch,
  ]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SquareLoader color="#4F118C" />
    </div>
  );
};

const LoginCallbackPage = () => {
  return (
    <Suspense>
      <LoginCallback />
    </Suspense>
  );
};

export default LoginCallbackPage;
