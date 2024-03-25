import { ErrorResponse } from "@/lib/client-errors";
import { UserResponseData } from "@/zod-schemas/user";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useMeQuery() {
  const query = useQuery<UserResponseData>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      const axiosInstance = axios.create();
      axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error: AxiosError<ErrorResponse>) => {
          if (error.response?.status === 401) {
            const res = await axiosInstance.post("/api/user/refresh");
            return res;
          } else if (
            error.response?.status === 403 &&
            typeof error.response?.data?.message === "string"
          ) {
            throw new AxiosError(error.response.data.message);
          }
        }
      );

      const res = await axiosInstance.get<UserResponseData>("/api/user");
      return res.data;
    }
  });
  return query;
}
