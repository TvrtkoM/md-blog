import { z } from "zod";

export const PostSchema = z.object({
  content: z.string().min(1, "Required"),
  title: z
    .string()
    .min(12, "Minimum 12 characters")
    .max(60, "Maximum 60 characters")
});

export type PostFormData = z.infer<typeof PostSchema>;

export const PostResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
  title: z.string(),
  slug: z.string(),
  userId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type PostResponseData = z.infer<typeof PostResponseSchema>;
