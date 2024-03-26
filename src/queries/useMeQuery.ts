import axiosInstance from "@/lib/axios-instance";
import { UserResponseData } from "@/zod-schemas/user";
import { useQuery } from "@tanstack/react-query";

export default function useMeQuery() {
  const query = useQuery<UserResponseData>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get<UserResponseData>("/api/user");
      return res.data;
    }
  });
  return query;
}
