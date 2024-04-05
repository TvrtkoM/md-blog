"use client";

import { cn } from "@/lib/utils";
import useCreatePostMutation from "@/mutations/useCreatePostMutation";
import { PostFormData, PostSchema } from "@/zod-schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <>Loading editor...</> }
);

const CreatePostForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: ""
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const { mutate: submitPost, isSuccess } = useCreatePostMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/posts");
    }
  }, [isSuccess, router]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitPost(data);
      })}
    >
      <div
        data-color-mode="light"
        className={cn("border border-transparent rounded-sm", {
          "border-red-500": errors?.content?.message
        })}
      >
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => {
            return (
              <MarkdownEditor
                value={value}
                className="h-96"
                enablePreview={false}
                toolbarsMode={[]}
                onChange={onChange}
              />
            );
          }}
        />
      </div>
      <Button type="submit" className="mt-7" disabled={!isValid}>
        Create
      </Button>
    </form>
  );
};

export default CreatePostForm;
