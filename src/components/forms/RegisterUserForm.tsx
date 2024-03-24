import { RegisterUserSchema } from "@/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import InputWithLabel from "./InputWithLabel";

export type RegistrationFormData = z.infer<typeof RegisterUserSchema>;

const RegisterUserForm = () => {
  const { control } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmPassword: "",
      password: ""
    },
    reValidateMode: "onChange",
    mode: "all"
  });

  return (
    <>
      <form className="mt-4 space-y-2">
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
        <Button className="!mt-7">Create account</Button>
      </form>
    </>
  );
};

export default RegisterUserForm;
