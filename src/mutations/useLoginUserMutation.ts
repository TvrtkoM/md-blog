import { ErrorResponse } from "@/lib/client-errors";
import { LoginFormData, UserResponseData } from "@/zod-schemas/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useLoginUserMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    UserResponseData,
    AxiosError<ErrorResponse>,
    LoginFormData
  >({
    mutationFn: async (data) => {
      const res = await axios.post<UserResponseData>("/api/user/login", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    }
  });
}
