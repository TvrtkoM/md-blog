"use client";

import { cn } from "@/lib/utils";
import useCreateOrUpdatePostMutation from "@/mutations/useCreateOrUpdatePostMutation";
import { PostFormData, PostSchema } from "@/zod-schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import InputWithLabel from "./InputWithLabel";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <>Loading editor...</> }
);

const EditPostForm = ({ post }: { post?: PostFormData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: post ?? {
      content: "",
      title: ""
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const { mutate: submitPost, isSuccess } = useCreateOrUpdatePostMutation();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNew = Boolean(post);

  useEffect(() => {
    if (isSuccess) {
      router.push("/posts");
    }
  }, [isSuccess, router]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setIsSubmitting(true);
        if (isNew) {
          submitPost({ ...data, id: post?.id });
        } else {
          submitPost(data);
        }
      })}
    >
      <InputWithLabel
        control={control}
        label="Title *"
        name="title"
        placeholder="Title"
        className="mb-6"
      />
      <div className="flex items-baseline justify-between h-6">
        <Label className="leading-6 cursor-pointer">
          <span className="text-xs">Content *</span>
        </Label>
        <p className="text-red-500 text-xs mt-0.5">
          {errors?.content?.message}
        </p>
      </div>
      <div data-color-mode="light">
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => {
            return (
              <MarkdownEditor
                value={value}
                enablePreview={false}
                toolbarsMode={[]}
                onChange={onChange}
                className={cn("border border-transparent rounded-sm h-96", {
                  "border-red-500": errors?.content?.message
                })}
              />
            );
          }}
        />
      </div>
      <Button
        type="submit"
        className="mt-7"
        disabled={!isValid || isSubmitting}
      >
        {post ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default EditPostForm;
