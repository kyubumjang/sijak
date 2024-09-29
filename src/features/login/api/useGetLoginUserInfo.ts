import { USER_KEYS } from "@/shared/api/keyFactory";
import { getLoginUserInfo } from ".";
import { useQuery } from "@tanstack/react-query";

const useGetLoginUserInfo = () => {
  return useQuery({
    queryKey: USER_KEYS.lists(),
    queryFn: () => getLoginUserInfo(),
    select: (response) => response,
  });
};

export default useGetLoginUserInfo;
