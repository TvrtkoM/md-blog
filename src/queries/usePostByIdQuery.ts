import axiosInstance from "@/lib/axios-instance";
import { PostResponseData } from "@/zod-schemas/post";
import { useQuery } from "@tanstack/react-query";

export default function (id: number) {
  return useQuery<PostResponseData>({
    queryKey: ["post", { id }],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/post/${id}`);
      return res.data;
    }
  });
}
