import { USER_KEYS } from "@/shared/api/keyFactory";
import { getAccessToken } from ".";
import { useQuery } from "@tanstack/react-query";

const useGetAccessToken = (code: string) => {
  return useQuery({
    queryKey: USER_KEYS.token(),
    queryFn: () => getAccessToken(code),
    select: (response) => response.data.data,
    meta: {
      errorMessage: "Failed to fetch Get Access Token",
    },
  });
};

export default useGetAccessToken;
