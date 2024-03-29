import axiosInstance from "@/lib/axios-instance";
import { ErrorResponse } from "@/lib/client-errors";
import { PostFormData, PostResponseData } from "@/zod-schemas/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation<PostResponseData, AxiosError<ErrorResponse>, PostFormData>(
    {
      mutationFn: async (data) => {
        const res = await axiosInstance.post<PostResponseData>(
          "/api/post/create",
          data
        );
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts"]
        });
      }
    }
  );
}
