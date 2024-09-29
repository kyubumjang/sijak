"use client";

import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { ClassList } from "@/entities/class/ui";
import SkeletonCard from "@/entities/class/ui/Class/SkeletonCard/SkeletonCard";
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
    <div className="flex flex-col w-full h-screen justify-start items-center p-4 min-h-[336px] pt-20 bg-[#E9E8EC]">
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-1">
          <div className="text-gray-900 text-[32px] font-bold">
            내가 찜한 클래스
          </div>
          <div className="text-gray-900 text-[32px]">한번에 보기</div>
        </div>
      </div>
      <div className="flex flex-col pt-14 pb-[209px]">
        <div className="flex px-[120px]">
          {isLoading ? (
            <div className="flex flex-row space-x-6">
              <SkeletonCard type="col" />
              <SkeletonCard type="col" />
              <SkeletonCard type="col" />
            </div>
          ) : classListData && isSuccess ? (
            <ClassList classListData={classListData} type="col" />
          ) : (
            <div>클래스가 존재하지 않습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
