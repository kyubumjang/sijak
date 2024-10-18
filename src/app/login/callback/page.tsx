"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SquareLoader } from "react-spinners";
import { setCookie } from "cookies-next";
import useGetAccessToken from "@/features/authentication/api/useGetAccessToken";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useLoginedUserStore from "@/shared/store/user";
import { useToast } from "@/shared/hooks/useToast";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { toast } = useToast();

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
        if (tokenData.is_new === true) {
          toast({
            title: "회원가입이 완료되었습니다.",
          });
        }
        if (tokenData.is_new === false) {
          toast({
            title: "로그인 성공!",
          });
        }

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
      toast({
        title: "로그인 실패!",
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
