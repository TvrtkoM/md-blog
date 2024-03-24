import { LoginUserSchema } from "@/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import InputWithLabel from "./InputWithLabel";

export type LoginFormData = z.infer<typeof LoginUserSchema>;

const RegisterUserForm = () => {
  const { control } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
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
        <Button className="!mt-7">Log in</Button>
      </form>
    </>
  );
};

export default RegisterUserForm;
