import { CLASS_KEYS } from "@/shared/api/keyFactory";
import { getClassInfo } from ".";
import { useQuery } from "@tanstack/react-query";

const useClassInfo = (classId: number) => {
  return useQuery({
    queryKey: CLASS_KEYS.detail({ classId }),
    queryFn: () => getClassInfo(classId),
    select: (response) => response.data,
  });
};

export default useClassInfo;
