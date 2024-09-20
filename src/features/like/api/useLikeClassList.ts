import { LIKE_CLASS_KEYS } from "@/shared/api/keyFactory";
import { getClassList } from ".";
import { useQuery } from "@tanstack/react-query";

const useLikeClassList = () => {
  return useQuery({
    queryKey: LIKE_CLASS_KEYS.list(),
    queryFn: () => getClassList(),
    select: (response) => response.data,
  });
};

export default useLikeClassList;
