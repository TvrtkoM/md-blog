import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutUserMutation() {
  const queryClient = useQueryClient();
  return useMutation<null>({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/api/user/logout/");
      return res.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    }
  });
}
