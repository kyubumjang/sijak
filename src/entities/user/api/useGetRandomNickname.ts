import { USER_KEYS } from "@/shared/api/keyFactory";
import { getRandomNickname } from ".";
import { useMutation } from "@tanstack/react-query";

const useGetRandomNickname = () => {
  return useMutation({
    mutationFn: () => getRandomNickname(),
  });
};

export default useGetRandomNickname;
