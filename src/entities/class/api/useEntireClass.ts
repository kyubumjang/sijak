import { CLASS_KEYS } from "@/shared/api/keyFactory";
import { getEntireClass } from ".";
import { useQuery } from "@tanstack/react-query";

const useEntireClass = () => {
  return useQuery({
    queryKey: CLASS_KEYS.list(),
    queryFn: () => getEntireClass(),
    select: (response) => response.data,
  });
};

export default useEntireClass;
