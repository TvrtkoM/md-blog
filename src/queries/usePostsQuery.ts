import axiosInstance from "@/lib/axios-instance";
import { PostResponseData } from "@/zod-schemas/post";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function usePostsQuery() {
  const query = useSuspenseQuery<PostResponseData[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get<PostResponseData[]>("/api/posts");
      return res.data;
    }
  });
  return query;
}
