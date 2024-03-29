import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./client-errors";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      const refreshRes = await axiosInstance.post("/api/user/refresh");
      if (error.config) {
        const res = await axiosInstance(error.config);
        return res;
      }
      return refreshRes;
    } else if (
      error.response?.status === 403 &&
      typeof error.response?.data?.message === "string"
    ) {
      throw new AxiosError(error.response.data.message);
    }
  }
);

export default axiosInstance;
