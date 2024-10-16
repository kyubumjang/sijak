import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostNickname } from "../model/user";
import { USER_KEYS } from "@/shared/api/keyFactory";
import { postNickname } from ".";

const usePostNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostNickname["Request"]["query"]) =>
      postNickname(params),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: USER_KEYS.lists(),
      });
    },
  });
};

export default usePostNickname;
