"use client";
import { LoginFormData, LoginUserSchema } from "@/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import InputWithLabel from "./InputWithLabel";
import useLoginUserMutation from "@/mutations/useLoginUserMutation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideMessage, showMessage } from "@/state/slices/alert/alertSlice";
import { useRouter, useSearchParams } from "next/navigation";

const LoginUserForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    reValidateMode: "onChange",
    mode: "all"
  });

  const { mutate: login, error, isSuccess } = useLoginUserMutation();

  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const message = error?.response?.data?.message;
    if (message && typeof message === "string") {
      dispatch(showMessage(message));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hideMessage());
      router.push(next ?? "/");
    }
  }, [isSuccess, next, router]);

  return (
    <>
      <form
        className="mt-4 space-y-2"
        onSubmit={handleSubmit((data) => {
          login(data);
        })}
      >
        <InputWithLabel
          control={control}
          name="email"
          label="E-mail *"
          placeholder="E-mail"
        />
        <InputWithLabel
          control={control}
          name="password"
          label="Password *"
          placeholder="Password"
          type="password"
        />
        <Button type="submit" className="!mt-7" disabled={!isValid}>
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginUserForm;
