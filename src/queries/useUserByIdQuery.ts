import axiosInstance from "@/lib/axios-instance";
import { UserResponseData } from "@/zod-schemas/user";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useUserByIdQuery(id: number) {
  const query = useSuspenseQuery<UserResponseData | null>({
    retry: false,
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosInstance.get<UserResponseData>(`/api/user/${id}`);
      return res.data;
    }
  });
  return query;
}
