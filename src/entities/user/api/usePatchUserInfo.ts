import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PatchUserInfo } from "../model/user";
import { USER_KEYS } from "@/shared/api/keyFactory";
import { patchUserInfo } from ".";

const usePatchUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatchUserInfo["Request"]["body"]) =>
      patchUserInfo(payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
};

export default usePatchUserInfo;
