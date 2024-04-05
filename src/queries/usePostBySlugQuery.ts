import axiosInstance from "@/lib/axios-instance";
import { PostResponseData } from "@/zod-schemas/post";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function usePostBySlugQuery(slug: string) {
  return useSuspenseQuery<PostResponseData>({
    queryKey: ["post", { slug }],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/post/${slug}`);
      return res.data;
    }
  });
}
