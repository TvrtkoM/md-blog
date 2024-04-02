"use client";
import useRegisterUserMutation from "@/mutations/useRegisterUserMutation";
import { RegisterUserSchema } from "@/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { Button } from "../ui/Button";
import InputWithLabel from "./InputWithLabel";

export type RegistrationFormData = z.infer<typeof RegisterUserSchema>;

const RegisterUserForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid, isValidating }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmPassword: "",
      password: ""
    },
    reValidateMode: "onChange",
    mode: "onChange"
  });
  const [submitting, setSubmitting] = useState(false);

  const email = watch("email");

  const [debouncedEmail] = useDebounce(email, 300, { leading: true });

  useEffect(() => {
    if (!debouncedEmail || !debouncedEmail.includes("@")) return;
    const controller = new AbortController();
    const res = axios.post<boolean>(
      "/api/user/check-exists",
      { email: debouncedEmail },
      { signal: controller.signal }
    );
    res.then((result) => {
      if (!result.data) return;
      setError("email", { message: "User with this e-mail already exists." });
    });
    return () => controller?.abort();
  }, [debouncedEmail, setError]);

  const { mutate: register, isSuccess, data } = useRegisterUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (!isSuccess || !data) return;
    router.push(`/auth/login?new-user=${data.name}`);
  }, [isSuccess, data, router]);

  return (
    <>
      <form
        className="mt-4 space-y-2"
        onSubmit={handleSubmit((data) => {
          setSubmitting(true);
          register(data);
        })}
      >
        <InputWithLabel
          control={control}
          name="name"
          label="Username *"
          placeholder="Username"
        />
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
        <p className="text-xs">
          Password must be 10-21 characters long, contain one uppercase letter,
          a number and a special symbol
        </p>
        <InputWithLabel
          control={control}
          name="confirmPassword"
          label="Confirm password *"
          placeholder="Confirm password *"
          type="password"
        />
        <Button
          type="submit"
          className="!mt-7"
          disabled={submitting || !isEmpty(errors) || isValidating || !isValid}
        >
          Create account
        </Button>
      </form>
    </>
  );
};

export default RegisterUserForm;
