import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { USER_KEYS } from "@/shared/api/keyFactory";
import { postLogout } from ".";

const usePostLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.lists(),
      });
    },
  });
};

export default usePostLogout;
