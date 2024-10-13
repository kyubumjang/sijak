import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PatchUserAddress } from "../model/user";
import { USER_KEYS } from "@/shared/api/keyFactory";
import { patchUserAddress } from ".";

const usePatchUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatchUserAddress["Request"]["body"]) =>
      patchUserAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
};

export default usePatchUserAddress;
