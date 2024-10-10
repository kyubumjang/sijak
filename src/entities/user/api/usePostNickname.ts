import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostNickname } from "../model/user";
import { postNickname } from ".";

const usePostNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostNickname["Request"]["query"]) =>
      postNickname(params),
    onSuccess: () => {},
  });
};

export default usePostNickname;
