import { RegistrationFormData } from "@/components/forms/RegisterUserForm";
import { ErrorResponse } from "@/lib/client-errors";
import { UserResponseData } from "@/zod-schemas/user";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useRegisterUserMutation() {
  return useMutation<
    UserResponseData,
    AxiosError<ErrorResponse>,
    RegistrationFormData
  >({
    mutationFn: async (data) => {
      const res = await axios.post<UserResponseData>(
        "/api/user/register",
        data
      );
      return res.data;
    }
  });
}
