"use client";

import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { ClassList } from "@/entities/class/ui";
import { Description } from "@/shared/ui";
import useClassList from "@/entities/class/api/useClassList";

const Home = () => {
  const [classListData, setClassListData] = useState<Class[]>();
  const { data, isLoading, isSuccess } = useClassList();

  const handleClassDataList = useCallback(() => {
    if (data) {
      const classData = data;
      setClassListData(classData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      handleClassDataList();
    }
  }, [handleClassDataList, isSuccess]);

  return (
    <div className="flex w-full h-full flex-col px-16">
      <Description />
      <div className="flex pb-4">
        <div className="font-bold text-xl">시:작 PICK 클래스</div>
      </div>
      <div className="flex pb-4">
        {isLoading ? (
          <div>loading...</div>
        ) : classListData ? (
          <ClassList classListData={classListData} />
        ) : (
          <div>클래스가 존재하지 않습니다</div>
        )}
      </div>
    </div>
  );
};

export default Home;
