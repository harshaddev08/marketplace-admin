import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { useState } from "react";

export const useUsers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const query = useQuery({
    queryKey: ["users", page, limit, search, role, status],
    queryFn: () =>
      userService.getUsers({
        page,
        limit,
        search,
        role: role === "all" ? undefined : role,
        isVerified: status === "all" ? undefined : status === "active",
      }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
  };
};
