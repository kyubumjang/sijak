"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect } from "react";
import useGetLoginUserInfo from "@/features/login/api/useGetLoginUserInfo";
import usePostKakaoCode from "@/features/login/api/usePostKakaoCode";

const LoginCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  const postKakaoCode = usePostKakaoCode();
  const { data, isLoading, isSuccess } = useGetLoginUserInfo();

  useEffect(() => {
    if (code) {
      postKakaoCode.mutate(
        {
          code: code,
        },
        {
          onSuccess: () => {
            // TODO: 로그인 유저 토큰 저장
            // TODO: 로그인 유저 정보 저장(JUSTAND)
            console.log("로그인 성공");
            console.log(data);
            // TODO: isNew 값에 따라 조건문 처리
            toast("회원가입 / 로그인 성공", {
              description:
                "시ː니어를 위한 문화생활 플랫폼에 오신 걸 환영합니다!",
            });
            router.push("/signup");
          },
          onError: (err) => {
            console.log("로그인 실패", err);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <ScaleLoader color="#4F118C" />
    </div>
  );
};

export default LoginCallbackPage;
