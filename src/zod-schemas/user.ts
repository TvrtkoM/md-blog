import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/
      ),
    confirmPassword: z.string()
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    }
  );

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
