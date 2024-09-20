import { CLASS_KEYS } from "@/shared/api/keyFactory";
import { getClassList } from ".";
import { useQuery } from "@tanstack/react-query";

const useClassList = () => {
  return useQuery({
    queryKey: CLASS_KEYS.list(),
    queryFn: () => getClassList(),
    select: (response) => response.data,
  });
};

export default useClassList;
