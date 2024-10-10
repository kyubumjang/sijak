import { useMutation, useQueryClient } from "@tanstack/react-query";

import { USER_KEYS } from "@/shared/api/keyFactory";
import { ValidateNickname } from "../model/user";
import { validateNickname } from ".";

const useValidateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ValidateNickname["Request"]["query"]) =>
      validateNickname(params),
    onSuccess: () => {},
  });
};

export default useValidateNickname;
