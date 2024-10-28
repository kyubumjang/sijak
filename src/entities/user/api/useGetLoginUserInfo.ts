import { USER_KEYS } from "@/shared/api/keyFactory";
import { getLoginUserInfo } from ".";
import { isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";

const useGetLoginUserInfo = (nickname: string) => {
  return useQuery({
    queryKey: USER_KEYS.lists(),
    queryFn: () => getLoginUserInfo(),
    select: (response) => response,
    enabled: !isEmpty(nickname),
    meta: {
      errorMessage: "Failed to fetch Login User Info",
    },
  });
};

export default useGetLoginUserInfo;
