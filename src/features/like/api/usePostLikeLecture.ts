import { LECTURE_KEYS, LIKE_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LikeLecture } from "../model/like";
import { postLikeLecture } from ".";

const usePostLikeLecture = (lectureId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LikeLecture["Request"]["query"]["params"]) =>
      postLikeLecture({
        params,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.detail({
          lectureId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: LIKE_LECTURE_KEYS.list(),
      });
    },
  });
};

export default usePostLikeLecture;
