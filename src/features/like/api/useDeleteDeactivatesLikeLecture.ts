import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LIKE_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { deleteDeactivatesLikeLecture } from ".";

const useDeleteDeactivatesLikeLecture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDeactivatesLikeLecture(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LIKE_LECTURE_KEYS.list(),
      });
      queryClient.invalidateQueries({
        queryKey: LIKE_LECTURE_KEYS.list({ page: 0, size: 9 }),
      });
    },
  });
};

export default useDeleteDeactivatesLikeLecture;
