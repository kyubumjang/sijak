import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostUserAgree } from "../model/user";
import { postUserAgree } from ".";

const usePostUserAgree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostUserAgree["Request"]["body"]) =>
      postUserAgree(payload),
    onSuccess: () => {},
  });
};

export default usePostUserAgree;
