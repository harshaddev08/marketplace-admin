import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => userService.getRoles(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
