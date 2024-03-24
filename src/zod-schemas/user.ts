import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().refine((val) => val.length > 0, "Required"),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,21}$/,
        {
          message: "Invalid password"
        }
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
  password: z.string().refine((val) => val.length > 0, "Required")
});

export type LoginFormData = z.infer<typeof LoginUserSchema>;

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type UserResponseData = z.infer<typeof UserResponseSchema>;
