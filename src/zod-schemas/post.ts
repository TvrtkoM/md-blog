import { z } from "zod";

export const PostSchema = z.object({
  content: z.string().min(1, "Required")
});

export type PostFormData = z.infer<typeof PostSchema>;

export const PostResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
  userId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type PostResponseData = z.infer<typeof PostResponseSchema>;
