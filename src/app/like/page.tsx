"use client";

import { useCallback, useEffect, useState } from "react";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Class } from "@/entities/class/model/class";
import { ClassList } from "@/entities/class/ui";
import Link from "next/link";
import useLikeClassList from "@/features/like/api/useLikeClassList";

const LikePage = () => {
  const [classListData, setClassListData] = useState<Class[]>();
  const { data, isLoading, isSuccess } = useLikeClassList();

  const handleLikeClassDataList = useCallback(() => {
    if (data) {
      const likeClassData = data;
      // FIXME: 수정
      setClassListData(likeClassData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      handleLikeClassDataList();
    }
  }, [handleLikeClassDataList, isSuccess]);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center p-4 min-h-[336px]">
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="absolute left-32">
          <Link href="/">
            <div className="flex flex-col items-center justify-center">
              <ArrowLeftIcon width={32} height={32} />
              <div className="text-xs">뒤로가기</div>
            </div>
          </Link>
        </div>
        <div className="text-gray-900 text-3xl pb-15 ">내가 찜한 클래스</div>
      </div>
      <div className="flex flex-col pt-14">
        <div className="flex px-[120px]">
          {/* FIXME: 수정 필요 */}
          {isLoading ? (
            <div>loading...</div>
          ) : classListData && isSuccess ? (
            <ClassList classListData={classListData} />
          ) : (
            <div>클래스가 존재하지 않습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
