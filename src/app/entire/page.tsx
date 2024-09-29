"use client";

import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { ClassList } from "@/entities/class/ui";
import SkeletonCard from "@/entities/class/ui/Class/SkeletonCard/SkeletonCard";
import useEntireClass from "@/entities/class/api/useEntireClass";

const EntirePage = () => {
  const [classListData, setClassListData] = useState<Class[]>();

  // TODO: 전체 클래스 가져오는 API로 수정 필요
  const { data, isLoading, isSuccess } = useEntireClass();

  const handleEntireClassDataList = useCallback(() => {
    if (data) {
      const entireClassData = data.data.data;
      // FIXME: 수정
      setClassListData(entireClassData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      handleEntireClassDataList();
    }
  }, [handleEntireClassDataList, isSuccess]);

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center p-4 min-h-[336px] pt-20 bg-[#E9E8EC]">
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-1">
          <div className="text-gray-900 text-[32px] font-bold">전체 클래스</div>
          <div className="text-gray-900 text-[32px]">한번에 보기</div>
        </div>
      </div>
      <div className="flex flex-col pt-14 pb-[209px]">
        <div className="flex px-[120px]">
          {/* FIXME: 수정 필요 */}
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

export default EntirePage;
