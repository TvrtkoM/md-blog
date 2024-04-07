import axiosInstance from "@/lib/axios-instance";
import { ErrorResponse } from "@/lib/client-errors";
import { PostFormData, PostResponseData } from "@/zod-schemas/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateOrUpdatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation<PostResponseData, AxiosError<ErrorResponse>, PostFormData>(
    {
      mutationFn: async (data) => {
        const { id, content, title } = data;
        if (id != null) {
          const res = await axiosInstance.put<PostResponseData>("/api/post", {
            id,
            content,
            title
          });
          return res.data;
        }
        const res = await axiosInstance.post<PostResponseData>("/api/post", {
          content,
          title
        });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts"]
        });
        queryClient.invalidateQueries({
          queryKey: ["post"]
        });
      }
    }
  );
}
